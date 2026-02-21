import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { UserRound, LogOut } from 'lucide-react';
import { ART_FESTIVAL_APP_NAME, MAP_ROUTE_PATH } from '@/react-app/constants';

export const Header = ({ user, onLogoutClick, onLoginClick }: {
  user?: User | null;
  onLogoutClick?: () => void;
  onLoginClick?: () => void;
}) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoClick=() => {
    navigate(MAP_ROUTE_PATH);
  }

  const handleConfirmLogout = async () => {
    setShowLogoutConfirm(false);
    onLogoutClick && await onLogoutClick();
  };

  const avatarJSX = user ? (
    <div className="flex items-center gap-2">
      {user.photoURL ? (
        <img 
          src={user.photoURL} 
          alt={user.displayName || 'User'} 
          className="w-6 h-6 rounded-full border border-zinc-900 cursor-pointer hover:opacity-75"
          onClick={() => setShowLogoutConfirm(true)}
        />
      ) : (
        <div className="w-6 h-6 rounded-full border border-zinc-900 bg-zinc-200 flex items-center justify-center cursor-pointer hover:opacity-75"
          onClick={() => setShowLogoutConfirm(true)}>
          <span className="text-xs font-bold">{user.displayName?.charAt(0) || '?'}</span>
        </div>
      )}
    </div>
  ) : (
    <button 
      onClick={onLoginClick} 
      className="w-6 h-6 flex flex-row justify-center items-center cursor-pointer rounded-full border border-zinc-900 hover:opacity-75"
      title="登入"
    >
      <UserRound size={16} className="text-zinc-900"/>
    </button>
  );

  const modalJSX = (
    <div className="fixed inset-0 flex items-center justify-center z-200">
      <div className="bg-white border-2 border-zinc-900 p-6 rounded shadow-lg max-w-sm">
        <div className='flex flex-row items-center gap-4'>
        <h2 className="text-lg font-bold">登出</h2>
        <LogOut size={14} className="text-zinc-900" />
        </div>
        
        <p className="text-sm text-gray-600 mb-6">您確定要登出嗎？</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowLogoutConfirm(false)}
            className="px-4 py-2 border border-zinc-900 text-zinc-900 font-mono text-sm font-bold hover:bg-zinc-100 transition-colors rounded cursor-pointer"
          >
            取消
          </button>
          <button
            onClick={handleConfirmLogout}
            className="px-4 py-2 bg-zinc-900 text-white font-mono text-sm font-bold hover:bg-zinc-700 transition-colors rounded cursor-pointer"
          >
            確認登出
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-10 border-b-2 border-zinc-900 flex justify-between items-center px-4 bg-white z-50 relative shrink-0">
        <span 
          className="font-mono font-bold text-xs tracking-widest cursor-pointer hover:opacity-75" 
          onClick={handleLogoClick}
          dangerouslySetInnerHTML={{ __html: ART_FESTIVAL_APP_NAME }}
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4dff88] animate-pulse border border-zinc-900" />
            <span className="font-mono text-xs font-bold">訊號連線中</span>
          </div>
          {avatarJSX}
        </div>
      </div>
      {showLogoutConfirm && modalJSX}
    </>
  );
};
