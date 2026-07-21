import { createContext, useContext, useState } from 'react';

interface MapContextType {
  geoLayerVisible: boolean;
  setGeoLayerVisible: (visible: boolean) => void;
  subMissionsVisible: boolean;
  setSubMissionsVisible: (visible: boolean) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [geoLayerVisible, setGeoLayerVisibleState] = useState<boolean>(() => {
    const saved = localStorage.getItem('geoLayerVisible');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [subMissionsVisible, setSubMissionsVisibleState] = useState<boolean>(() => {
    const saved = localStorage.getItem('subMissionsVisible');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const setGeoLayerVisible = (visible: boolean) => {
    setGeoLayerVisibleState(visible);
    localStorage.setItem('geoLayerVisible', JSON.stringify(visible));
  };

  const setSubMissionsVisible = (visible: boolean) => {
    setSubMissionsVisibleState(visible);
    localStorage.setItem('subMissionsVisible', JSON.stringify(visible));
  };

  return (
    <MapContext.Provider value={{ geoLayerVisible, setGeoLayerVisible, subMissionsVisible, setSubMissionsVisible }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) throw new Error('useMap must be used within MapProvider');
  return context;
};