import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/react-app/components/AppLayout';
import { MAP_ROUTE_PATH } from '@/react-app/constants';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToMap = () => {
    navigate(MAP_ROUTE_PATH);
  };

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center p-6 h-full">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-center mb-6 text-lg">在分解的路途中迷失了嗎</p>
        <div className="text-center text-sm text-gray-600 mb-8">
          <p>您所尋找的頁面不存在。</p>
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

export default NotFound;
