import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { Login, TreasureHunt, NotFound } from "./scene";
import { AuthProvider } from "./AuthContext";
import "./index.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const TreasureHuntPaths = ['kzqpt9', 'mrvxa7'].map(siteId => `/treasure-hunt/${siteId}`);

/*
// treasureLoader.ts
import { redirect } from "react-router-dom";

export async function treasureLoader() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return user;
}

// auth.ts
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const auth = getAuth();

    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}
*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          {TreasureHuntPaths?.map((path) => <Route key={path} path={path} element={<TreasureHunt />} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>,
);
