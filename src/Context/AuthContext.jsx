import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);

  const auth = getAuth();
  const profileRef = collection(db, "profile");

  const fetchProfile = async () => {
    console.log(auth.currentUser.email);

    const profileRef = collection(db, "profile");
    const q = query(profileRef, where("email", "==", auth.currentUser.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("no such profile");
    } else {
      let data = querySnapshot.docs[0].data();
      console.log(data, querySnapshot.docs[0].id);
      setCurrentProfile({ avatar: data.avatar, name: data.name });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe; // Cleanup the subscription on unmount
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const value = {
    user: currentUser,
    logOut,
    currentProfile,
    setCurrentProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
