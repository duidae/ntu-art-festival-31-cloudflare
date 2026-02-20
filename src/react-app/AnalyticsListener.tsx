import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";

export const AnalyticsListener = () => {
  const location = useLocation();

  useEffect(() => {
    const analytics = getAnalytics();

    logEvent(analytics, "page_view", {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);

  return null;
};
