import { useNavigate } from 'react-router-dom';
import { Header } from '@/react-app/components/Header';
import { NoiseOverlay } from '@/react-app/components/NoiseOverlay';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#dcdcdc] flex items-center justify-center p-0 md:p-8 font-sans text-zinc-900">
      <div className="w-full max-w-md h-[100dvh] md:h-[800px] bg-[#f4f4f5] md:border-4 border-zinc-900 shadow-2xl overflow-hidden relative flex flex-col">
        <NoiseOverlay />
        <Header onLogoClick={handleBackToHome} />
        <div className="flex-1 relative overflow-auto flex flex-col items-center justify-center p-6">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-center mb-6 text-lg">在分解的路途中迷失了嗎</p>
          <div className="text-center text-sm text-gray-600 mb-8">
            <p>您所尋找的頁面不存在。</p>
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
};

export default NotFound;
