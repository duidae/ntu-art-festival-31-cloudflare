import { db } from "@/react-app/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getUser = async (uid: string) => {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? snapshot.data() : null;
};

export const updateUser = async (uid: string, data: any) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};
