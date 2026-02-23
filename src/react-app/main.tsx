import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, LoaderFunctionArgs, Outlet } from "react-router-dom";
import { AuthProvider } from "@/react-app/AuthContext";
import { ART_FESTIVAL_TREASURE_HUNT_PATHS } from "@/react-app/constants";
import { App } from "@/react-app/App";
import { AnalyticsListener } from "@/react-app/AnalyticsListener";
import { ErrorBoundary } from "@/react-app/components/ErrorBoundary";
import { Login, TreasureHunt } from "@/react-app/scene";
import "./firebase";
import "./index.css";

const RootLayout = () => (
  <>
    <AnalyticsListener />
    <Outlet />
  </>
);

const treasureHuntLoader = async ({ params }: LoaderFunctionArgs) => {
  const { siteCode } = params;

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
