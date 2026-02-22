import { useEffect, useState } from 'react';
import { useNavigate, useLoaderData, useLocation } from 'react-router-dom';
import { useAuth } from "@/react-app/AuthContext";
import { MAP_ROUTE_PATH, ART_FESTIVAL_TREASURE_HUNT_CODE_MISSION_MAP } from '@/react-app/constants';
import { AppLayout } from '@/react-app/components/AppLayout';
import { MissionView } from '@/react-app/scene/MissionView';

interface TreasureHuntLoaderData {
  siteCode: string;
}

export const TreasureHunt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const { siteCode } = useLoaderData() as TreasureHuntLoaderData;
  const mission = ART_FESTIVAL_TREASURE_HUNT_CODE_MISSION_MAP.get(siteCode);
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    console.log("Checking user authentication in TreasureHunt scene:", user, "isLoading:", isLoading);
    if (!isLoading && !user) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, isLoading, navigate, location.pathname]);

  useEffect(() => {
    if (!mission?.story) {
      setStory(null);
      return;
    }

    const load = async () => {
      try {
        const resp = await fetch(mission.story);
        const json = await resp.json();
        setStory(json);
      } catch (err) {
        console.error(err);
        setStory(null);
      }
    };

    load();
  }, [mission?.story]);

  const handleBackToMap = () => {
    navigate(MAP_ROUTE_PATH);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <p className="text-center text-gray-600">載入中...</p>
        </div>
      </AppLayout>
    );
  }

  const storyJSX = (
    <div className="flex flex-col items-center justify-start p-6 h-full w-full">
      <MissionView story={story} onClose={handleBackToMap} />
    </div>
  );

  const defaultJSX = (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <h1 className="text-2xl font-bold mb-4">{mission?.title || '寶藏獵人'}</h1>
      <p className="text-center mb-6">Site Code: <span className="font-mono font-bold">{siteCode}</span></p>
      <div className="text-center text-sm text-gray-600 mb-8">
        <p>探索並發現此地點的故事和線索。</p>
      </div>
      <button
        onClick={handleBackToMap}
        className="px-6 py-2 bg-zinc-900 text-white font-mono text-sm font-bold hover:bg-zinc-700 transition-colors border border-zinc-900 cursor-pointer"
      >
        返回主畫面
      </button>
    </div>
  );

  return (
    <AppLayout>
      {story ? storyJSX : defaultJSX}
    </AppLayout>
  );
};

export default TreasureHunt;
