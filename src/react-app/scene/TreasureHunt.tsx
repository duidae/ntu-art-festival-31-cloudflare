import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/react-app/components/AppLayout';
import { MAP_ROUTE_PATH } from '@/react-app/constants';
import { useAuth } from "@/react-app/AuthContext";

export const TreasureHunt = () => {
  const user = useAuth();
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();
  const displaySiteId = siteId ? `site-${siteId}` : 'unknown';

  useEffect(() => {
    console.log("Current user:", user);
    if (!user) {
      navigate("/Login");
    }
  }, [user]);

  const handleBackToMap = () => {
    navigate(MAP_ROUTE_PATH);
  };

  return (
    <AppLayout onLogoClick={handleBackToMap}>
      <div className="flex flex-col items-center justify-center p-6 h-full">
        <h1 className="text-2xl font-bold mb-4">寶藏獵人</h1>
        <p className="text-center mb-6">Site ID: <span className="font-mono font-bold">{displaySiteId}</span></p>
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
    </AppLayout>
  );
};

export default TreasureHunt;
