import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/react-app/components/Header';
import { NoiseOverlay } from '@/react-app/components/NoiseOverlay';
import { useAuth } from '@/react-app/AuthContext';
import { MAP_ROUTE_PATH } from '@/react-app/constants';

interface AppLayoutProps {
  children: ReactNode;
  onLogoClick?: () => void;
}

export const AppLayout = ({ children, onLogoClick }: AppLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(MAP_ROUTE_PATH);
  };

  return (
    <div className="min-h-screen bg-[#dcdcdc] flex items-center justify-center p-0 md:p-8 font-sans text-zinc-900">
      <div className="w-full max-w-md h-[100dvh] md:h-[800px] bg-[#f4f4f5] md:border-4 border-zinc-900 shadow-2xl overflow-hidden relative flex flex-col">
        <NoiseOverlay />
        <Header
          user={user}
          onLogoClick={onLogoClick}
          onLogoutClick={handleLogout}
        />
        <div className="flex-1 relative overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
