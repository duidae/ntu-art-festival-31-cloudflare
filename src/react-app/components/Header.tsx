import { ART_FESTIVAL_APP_NAME } from '@/react-app/constants';

interface HeaderProps {
  onLogoClick?: () => void;
}

export const Header = ({ onLogoClick }: HeaderProps) => {
  return (
    <div className="h-10 border-b-2 border-zinc-900 flex justify-between items-center px-4 bg-white z-50 relative shrink-0">
      <span 
        className="font-mono font-bold text-xs tracking-widest cursor-pointer hover:opacity-75" 
        onClick={onLogoClick}
        dangerouslySetInnerHTML={{ __html: ART_FESTIVAL_APP_NAME }}
      />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#4dff88] animate-pulse border border-zinc-900" />
        <span className="font-mono text-xs font-bold">訊號連線中</span>
      </div>
    </div>
  );
};
