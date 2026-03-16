import { useEffect, useRef, useState } from 'react';
import L, { CircleMarker } from 'leaflet';
import { Feature } from "geojson";
import { Waves, CircleQuestionMark, MapPin, Scan, LocateFixed } from 'lucide-react';
import { Button } from '@/react-app/components/Button';
import { CameraOverlay } from '@/react-app/components/CameraOverlay';
import { SCENES } from '@/react-app/constants/enum';
import {
  ART_FESTIVAL_CENTER,
  MISSIONS,
  /*
  ART_FESTIVAL_TREASURE_HUNTER_START_DATE,
  ART_FESTIVAL_TREASURE_HUNTER_END_DATE,
  ART_FESTIVAL_START_DATE,
  ART_FESTIVAL_END_DATE,
  */
  ART_FESTIVAL_LOGO,
  ART_FESTIVAL_LOGO_SVG,
  THEME_COLORS,
  THEME_COLOR_VALUES,
  DEFAULT_COLOR,
  MAP_ZOOM,
} from '@/react-app/constants';
import { FormatLatLon } from '@/react-app/utils';
import { useAuth } from '@/react-app/AuthContext';
import { getUser } from '@/react-app/services/user.service';

interface MapProps {
  setScene: (targetScene: {scene: SCENES, story: string}) => void;
  progress: { m1: boolean; m2: boolean; m3: boolean, b1: boolean; b2: boolean; b3: boolean};
}

const SIZE = {
  LARGE: 36,
  MEDIUM: 24,
  SMALL: 18,
};

export const MissionMap = ({ setScene, progress }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userCircleRef = useRef<CircleMarker | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { user, isLoading: authLoading } = useAuth();

  const allDone = progress.m1 && progress.m2 && progress.m3;
  const [position, setPosition] = useState<{lat: number; lon: number; accuracy?: number} | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [visitedSites, setVisitedSites] = useState<Record<string, boolean> | null>(null);

  useEffect(() => {
    requestGeolocation();

    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = initMap(mapContainerRef.current);
      addGeoJsonLayer(map);
      addMarkers(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Clear geolocation watch
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (mapInstanceRef.current) {
        if (userCircleRef.current) {
          mapInstanceRef.current.removeLayer(userCircleRef.current);
          userCircleRef.current = null;
        }
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [setScene, progress, visitedSites]);

  useEffect(() => {
    const fetchVisitedSites = async () => {
      if (!authLoading && user) {
        try {
          const userData = await getUser(user.uid);
          setVisitedSites(userData?.visitedSites || {});
        } catch (err) {
          console.error('Failed to fetch visited sites:', err);
          setVisitedSites({});
        }
      } else if (!authLoading && !user) {
        setVisitedSites({});
      }
    };

    fetchVisitedSites();
  }, [user, authLoading]);
  
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch(() => {});
    }
  }, [cameraStream]);

  // const todayYYYYMMDD = FormatDateYYYYMMDD(new Date());
  // const isTreasureHuntOutdated = ;//todayYYYYMMDD > ART_FESTIVAL_TREASURE_HUNTER_END_DATE;
  const isTreasureHuntActive = import.meta.env.VITE_ART_FESTIVAL_TREASURE_HUNTER_ENABLED === "true";//todayYYYYMMDD >= ART_FESTIVAL_TREASURE_HUNTER_START_DATE && todayYYYYMMDD <= ART_FESTIVAL_TREASURE_HUNTER_END_DATE;
  const isArtFestivalActive = import.meta.env.VITE_ART_FESTIVAL_ENABLED === "true";// todayYYYYMMDD >= ART_FESTIVAL_START_DATE && todayYYYYMMDD <= ART_FESTIVAL_END_DATE;
  
  const mainMissions = [
    {
      id: SCENES.MAIN_MISSION,
      isActive: isArtFestivalActive,
      pos: MISSIONS.Main[0].coordinates as L.LatLngExpression,
      title: MISSIONS.Main[0].title,
      img: `<img src="${MISSIONS.Main[0].img || ''}" width="144" height="144" loading="lazy" style="width:100%; height:100%; display:block; object-fit:cover;" />`,
      done: progress.m1
    }
  ];

  const subMissions = MISSIONS.Sub.map(m => {
    return {
      id: SCENES.SUB_MISSION,
      isActive: isArtFestivalActive,
      pos: m.coordinates as L.LatLngExpression,
      title: m.title,
      img: `<img src="${m.img || ''}" width="144" height="144" loading="lazy" style="width:100%; height:100%; display:block; object-fit:cover;" />`,
      story: m.story || "",
      done: true,
    };
  });

  // TODO: Remove missions after art festival
  const preMissions = MISSIONS.Pre?.map((m, index) => {
    const color = THEME_COLOR_VALUES[index % THEME_COLOR_VALUES.length];
    return {
      id: SCENES.OTHER_MISSION,
      isActive: isTreasureHuntActive,
      pos: m.coordinates as L.LatLngExpression,
      title: m.title,
      img: `
        <div style="
          width:90%;
          height:90%;
          background:${color};
          -webkit-mask: url(${ART_FESTIVAL_LOGO_SVG}) center / contain no-repeat;
          mask: url(${ART_FESTIVAL_LOGO_SVG}) center / contain no-repeat;
        "></div>
      `,
      story: m.story || "",
      done: visitedSites?.[`/treasure-hunt/${m.siteCode}`] === true,
      color: color
    };
  }) ?? [];

  const otherMissions = MISSIONS.Others?.map(m => {
    return {
      id: SCENES.OTHER_MISSION,
      isActive: isArtFestivalActive,
      pos: m.coordinates as L.LatLngExpression,
      title: m.title,
      img: `<img src="${m.img || ART_FESTIVAL_LOGO}" width="144" height="144" loading="lazy" style="width:100%; height:100%; display:block; object-fit:cover;" />`,
      story: m.story || "",
      done: true,
    };
  }) ?? [];
  // TODO: Remove missions after art festival

  const requestGeolocation = () => {
    setGeoError(null);
    if (navigator?.geolocation) {
      // Clear previous watch if exists
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      // Watch position for continuous tracking
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newPosition = { lat: pos.coords.latitude, lon: pos.coords.longitude, accuracy: pos.coords.accuracy };
          setPosition(newPosition);
          setGeoError(null);

          // Update marker and circle on map if map is ready
          if (mapInstanceRef.current) {
            if (userMarkerRef.current) {
              userMarkerRef.current.setLatLng([newPosition.lat, newPosition.lon]);
            }
            if (userCircleRef.current) {
              userCircleRef.current.setLatLng([newPosition.lat, newPosition.lon]);
            } else if (newPosition.accuracy) {
              const circle = L.circleMarker([newPosition.lat, newPosition.lon], { radius: 50, color: THEME_COLORS.Brown, fillColor: THEME_COLORS.Brown, fillOpacity: 0.75, weight: 1 }).addTo(mapInstanceRef.current);
              userCircleRef.current = circle;
            }
          }
        },
        (err) => {
          const msg = err.code === 1 ? '位置權限已被拒絕' : '無法取得位置';
          setGeoError(msg);
          console.warn('Geolocation failed:', err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10_000 }
      );
    }
  };

  const createMarkerIcon = (isDone: boolean, scene: SCENES, isActive: boolean = true, color: string = DEFAULT_COLOR) => {
    const size = (scene === SCENES.MAIN_MISSION || scene === SCENES.OTHER_MISSION) ? SIZE.LARGE : (scene === SCENES.SUB_MISSION ? SIZE.SMALL : SIZE.MEDIUM);
    const innerContent = isDone
      ? `<div style="
          width: 12px;
          height: 12px;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        ">★</div>`
      : `<div style="
          font-size: 12px;
          font-weight: bold;
          color: white;
          line-height: 1;
        ">?</div>`;

    return L.divIcon({
      className: 'custom-brutalist-icon',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${!isActive ? 'transparent' : (isDone ? color : DEFAULT_COLOR)};
          border: 2px solid #18181b;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: ${!isActive ? 'none' : '3px 3px 0px 0px #18181b'};
          opacity: ${!isActive ? 0.2 : 1};
          cursor: ${isActive ? 'pointer' : 'not-allowed'};
          position: relative;
        ">
          ${innerContent}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const initMap = (container: HTMLDivElement): L.Map => {
    const map = L.map(container, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
    }).setView(ART_FESTIVAL_CENTER, MAP_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    return map;
  };

  const addGeoJsonLayer = (map: L.Map) => {
    fetch('/1932TaipeiWaterRoutes.geojson')
      .then(res => res.json())
      .then(data => {
        const geoLayer = L.geoJSON(data, {
          filter: (f: Feature) => f.geometry?.type !== "Point"
        }).addTo(map);
        L.control.layers({}, {
          '💧1932台北舊水路': geoLayer
        }, {
          collapsed: false
        }).addTo(map);
      })
      .catch(err => console.error('Failed to load GeoJSON', err));
  };

  const addMarkers = (map: L.Map) => {
    const currentPosition: [number, number] = position ? [position.lat, position.lon] : ART_FESTIVAL_CENTER;
    const marker = L.marker(currentPosition, { 
      icon: L.divIcon({
        className: 'user-icon',
        html: `<div class="w-4 h-4 bg-zinc-900 rotate-45 border-2 animate-spin-slow"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })
    }).addTo(map);
    userMarkerRef.current = marker;
    addMissionMarkers(map, preMissions);
    addMissionMarkers(map, otherMissions);
    addMissionMarkers(map, mainMissions);
    addMissionMarkers(map, subMissions);
  };

  const addMissionMarkers = (
    map: L.Map,
    missions: any[],
  ) => {
    missions.forEach((m) => {
      const popupContent = document.createElement('div');
      popupContent.style = `background: ${m.done ? m.color : THEME_COLORS.DarkGray};`
      popupContent.className =
        'p-4 bg-white font-mono flex flex-col items-center';

      const marker = L.marker(m.pos, {
        icon: createMarkerIcon(m.done, m.id, m.isActive, m.color || THEME_COLORS.DarkGray),
        interactive: true, // 🔥 force interaction
      }).addTo(map);

      const iconHtml = m.done
        ? `<div style="background: ${THEME_COLORS.MediumGray};" class="w-36 h-36 mb-2 flex items-center justify-center border-2 border-zinc-900 shadow-[2px_2px_0px_0px_#000] overflow-hidden">${m.img}</div>`
        : `<div class="w-12 h-12 mb-2 flex items-center justify-center bg-zinc-100 border-2 border-zinc-900 shadow-[2px_2px_0px_0px_#000]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>`;

      popupContent.innerHTML = `
        ${iconHtml}
        <p class="text-[10px] font-black mb-2 uppercase tracking-widest text-zinc-900">${m.title}</p>
        <button style="color: ${THEME_COLORS.Cream};" class="bg-zinc-900 px-4 py-1 text-[10px] font-bold border-2 border-black hover:bg-zinc-800 transition-colors uppercase cursor-pointer">
          ${m.done ? '檔案已歸檔' : '進入節點'}
        </button>
      `;

      const btn = popupContent.querySelector('button');
      if (btn) {
        btn.onclick = (e) => {
          e.preventDefault();
          setScene({ scene: m.id, story: m.story || '' });
        };
      }

      if (m.isActive) {
        marker.bindPopup(popupContent, {
          minWidth: 120,
          autoPan: false,
          closeButton: false,
        });

        marker.on('click', () => {
          map.panTo(marker.getLatLng(), { animate: true });
        });
      }
    });
  };

  const activateCamera = async () => {
    try {
      const stream = await navigator?.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' }, audio: true });
      setCameraStream(stream);
      setCameraActive(true);
    } catch (err) {
      console.error('Failed to access camera', err);
      setCameraActive(false);
    }
  };

  const panToMissionsCenter = () => {
    position && mapInstanceRef.current && mapInstanceRef.current.panTo(ART_FESTIVAL_CENTER, { animate: true });
  };

  const panToUserLocation = () => {
    position && mapInstanceRef.current && mapInstanceRef.current.panTo([position.lat, position.lon], { animate: true });
  };

  const mapToolbarJSX = (
    <div className="absolute bottom-8 left-4 right-4 h-16 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex items-center justify-around px-2 z-[100]">
      <button className="flex flex-col items-center gap-1 text-zinc-900 group cursor-pointer" onClick={panToMissionsCenter}>
        <div style={{ background: THEME_COLORS.Cream }} className="p-1 border border-zinc-900 transition-transform group-hover:-translate-y-1">
          <MapPin size={18} />
        </div>
        <span className="text-[10px] font-bold tracking-tighter">地圖</span>
      </button>
      <button disabled={!!geoError} className={`flex flex-col items-center gap-1 text-zinc-900 group relative ${geoError? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={panToUserLocation}>
        <div className="p-1 border border-zinc-900 bg-zinc-900 text-white transition-transform group-hover:scale-110">
           <LocateFixed size={18} />
        </div>
        <span className="text-[10px] font-bold tracking-tighter">定位</span>
      </button>
      {isArtFestivalActive && <button id="camera" className="flex flex-col items-center gap-1 text-zinc-900 group relative cursor-pointer" onClick={() => { !cameraActive && activateCamera(); }}>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#4dff88] rounded-full border border-black z-10"></div>
        <div className="p-1 border border-zinc-900 bg-zinc-900 text-white transition-transform group-hover:scale-110">
           <Scan size={18} />
        </div>
        <span className="text-[10px] font-bold tracking-tighter">掃描</span>
      </button>}
    </div>
  );

  return (
    <div className="h-full bg-[#e8e8e6] relative overflow-hidden flex flex-col">
      <div ref={mapContainerRef} className="flex-1 z-0 grayscale contrast-125" style={{ minHeight: 480 }} />
      
      <div className="absolute top-3 left-4 z-[100] flex items-center gap-2">
        <div style={{ borderColor: THEME_COLORS.Cream }} className="flex flex-row align-center gap-1 bg-zinc-900 text-white p-2 border-2 font-mono text-[10px]">
          {position ? FormatLatLon(position.lat, position.lon) : geoError || '定位中...'}
          {geoError && <button className="cursor-pointer" onClick={() => setScene({scene: SCENES.SUB_MISSION, story: "/story/geolocation-permission-help.json"})}><CircleQuestionMark size={14}/></button>}
        </div>
      </div>

      {allDone && (
        <div className="absolute inset-0 bg-white/90 z-[2000] flex flex-col items-center justify-center animate-fade-in p-8">
          <div className="relative mb-6">
            <Waves size={64} className="text-zinc-900" />
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#4dff88] rounded-full mix-blend-multiply animate-ping"></div>
          </div>
          <h2 className="text-3xl font-black mb-2 text-zinc-900 uppercase">系統同步完成</h2>
          <p className="text-zinc-500 font-mono text-xs mb-8">ALL NODES CONNECTED.</p>
          <Button variant="secondary" onClick={() => setScene({scene: SCENES.FINALE, story: ""})} className="w-full">
            進入地下終章
          </Button>
        </div>
      )}
      {mapToolbarJSX}
      {videoRef && <CameraOverlay cameraActive={cameraActive} videoRef={videoRef} cameraStream={cameraStream} setCameraStream={setCameraStream} setCameraActive={setCameraActive} />}
    </div>
  );
};

export default MissionMap;
