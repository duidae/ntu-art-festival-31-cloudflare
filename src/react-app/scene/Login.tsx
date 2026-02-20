import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AppLayout } from '@/react-app/components/AppLayout';
import { useAuth } from "@/react-app/AuthContext";
import { MAP_ROUTE_PATH } from '@/react-app/constants';

export const Login = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (user && !isLoading) {
      console.log(`User detected in AuthContext, redirecting to ${MAP_ROUTE_PATH}`);
      navigate(MAP_ROUTE_PATH);
    } else {
      console.log("No user detected in AuthContext");
    }
  }, [user, isLoading, navigate]);

  const handleLogin = async () => {
    try {
      setIsSigningIn(true);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in error:", error);
      setIsSigningIn(false);
    }
  };

  const isLoadingJSX = (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <p className="text-center text-gray-600">載入中...</p>
    </div>
  );

  const loginJSX = (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <h1 className="text-3xl font-bold mb-6">登入</h1>
      <p className="text-center mb-8 text-gray-600">
        使用您的 Google 帳號登入進行體驗
      </p>
      <button
        onClick={handleLogin}
        disabled={isSigningIn}
        className="flex flex-row items-center gap-2 px-8 py-3 bg-zinc-900 text-white font-mono text-sm font-bold hover:bg-zinc-700 transition-colors border border-zinc-900 cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="/google-logo.png" className="ml-2 w-5 h-5 bg-transparent" />
        {isSigningIn ? '登入中...' : '使用 Google 登入'}
      </button>
    </div>
  );

  return (
    <AppLayout>
      {isLoading ? isLoadingJSX : loginJSX}
    </AppLayout>
  );
};

export default Login;
