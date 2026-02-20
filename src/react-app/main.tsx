import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, LoaderFunctionArgs, Outlet } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { AuthProvider } from "./AuthContext";
import { AnalyticsListener } from "./AnalyticsListener";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ART_FESTIVAL_TREASURE_HUNT_PATHS } from "./constants";
import App from "./App.tsx";
import { Login, TreasureHunt } from "./scene";
import "./index.css";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
initializeApp(firebaseConfig);

const RootLayout = () => (
  <>
    <AnalyticsListener />
    <Outlet />
  </>
);

const treasureHuntLoader = async ({ params }: LoaderFunctionArgs) => {
  const { siteCode } = params;
  console.log("Treasure Hunt loader called with siteCode:", siteCode);

  if (!siteCode || !ART_FESTIVAL_TREASURE_HUNT_PATHS.includes(siteCode)) {
    console.warn(`Invalid treasure hunt siteCode: ${siteCode}`);
    throw new Response("Not Found", { status: 404 });
  }

  return { siteCode };
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/treasure-hunt/:siteCode",
        element: <TreasureHunt />,
        errorElement: <ErrorBoundary />,
		loader: treasureHuntLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
