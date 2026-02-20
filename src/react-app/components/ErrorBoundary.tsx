import { useRouteError } from 'react-router-dom';
import { NoiseOverlay } from '@/react-app/components/NoiseOverlay';
import { ART_FESTIVAL_APP_NAME } from '@/react-app/constants';

export const ErrorBoundary = () => {
  const error = useRouteError();
  
  let statusCode = 404;
  let statusText = "Not Found";
  let message = "您所尋找的頁面不存在。";

  if (error instanceof Response) {
    statusCode = error.status;
    statusText = error.statusText;
  }

  return (
    <div className="min-h-screen bg-[#dcdcdc] flex items-center justify-center p-0 md:p-8 font-sans text-zinc-900">
      <div className="w-full max-w-md h-[100dvh] md:h-[800px] bg-[#f4f4f5] md:border-4 border-zinc-900 shadow-2xl overflow-hidden relative flex flex-col">
        <NoiseOverlay />
        <div className="h-10 border-b-2 border-zinc-900 flex justify-between items-center px-4 bg-white z-50 relative shrink-0">
          <span 
            className="font-mono font-bold text-xs tracking-widest"
            dangerouslySetInnerHTML={{ __html: ART_FESTIVAL_APP_NAME }}
          />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4dff88] animate-pulse border border-zinc-900" />
            <span className="font-mono text-xs font-bold">訊號連線中</span>
          </div>
        </div>
        <div className="flex-1 relative overflow-auto flex flex-col items-center justify-center p-6">
          <h1 className="text-5xl font-bold mb-4">{statusCode}</h1>
          <p className="text-center mb-6 text-lg">{statusCode === 404 ? '在分解的路途中迷失了嗎' : statusText}</p>
          <div className="text-center text-sm text-gray-600 mb-8">
            <p>{message}</p>
          </div>
          <a
            href="/"
            className="px-6 py-2 bg-zinc-900 text-white font-mono text-sm font-bold hover:bg-zinc-700 transition-colors border border-zinc-900 cursor-pointer"
          >
            返回主畫面
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
