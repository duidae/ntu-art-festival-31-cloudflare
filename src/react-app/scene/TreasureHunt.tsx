import { useParams, useNavigate } from 'react-router-dom';
import { ART_FESTIVAL_APP_NAME } from '@/react-app/constants';

export default function TreasureHunt() {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();
  const displaySiteId = siteId ? `site-${siteId}` : 'unknown';

  const handleBackToHome = () => {
    navigate('/');
  };

  const headerJSX = (
    <div className="h-10 border-b-2 border-zinc-900 flex justify-between items-center px-4 bg-white z-50 relative shrink-0">
      <span 
        className="font-mono font-bold text-xs tracking-widest cursor-pointer hover:opacity-75" 
        onClick={handleBackToHome}
        dangerouslySetInnerHTML={{ __html: ART_FESTIVAL_APP_NAME }}
      />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#4dff88] animate-pulse border border-zinc-900" />
        <span className="font-mono text-xs font-bold">訊號連線中</span>
      </div>
    </div>
  );

  const noiseOverlayJSX = (
    <div 
      className="absolute inset-0 opacity-[0.08] pointer-events-none z-0 mix-blend-multiply" 
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` 
      }}
    />
  );

  return (
    <div className="min-h-screen bg-[#dcdcdc] flex items-center justify-center p-0 md:p-8 font-sans text-zinc-900">
      <div className="w-full max-w-md h-[100dvh] md:h-[800px] bg-[#f4f4f5] md:border-4 border-zinc-900 shadow-2xl overflow-hidden relative flex flex-col">
        {noiseOverlayJSX}
        {headerJSX}
        <div className="flex-1 relative overflow-auto flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold mb-4">寶藏獵人</h1>
          <p className="text-center mb-6">Site ID: <span className="font-mono font-bold">{displaySiteId}</span></p>
          <div className="text-center text-sm text-gray-600 mb-8">
            <p>探索並發現此地點的故事和線索。</p>
          </div>
          <button
            onClick={handleBackToHome}
            className="px-6 py-2 bg-zinc-900 text-white font-mono text-sm font-bold hover:bg-zinc-700 transition-colors border border-zinc-900 cursor-pointer"
          >
            返回主畫面
          </button>
        </div>
      </div>
    </div>
  );
}
