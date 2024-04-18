import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { checkURLAvailability } from "../functions/functions";

export const useProfile = () => {
  const { setCurrentUser, setCurrentProfile, currentProfile } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileCollection = collection(db, "profiles");
  const auth = getAuth();

  const fetchProfile = async () => {
    const user = auth.currentUser;
    console.log(user);

    const q = query(profileCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    setLoading(true);
    if (querySnapshot.empty) {
      console.log("no such profile, creating new profile.....");
      try {
        const finalUrl = await checkURLAvailability(user.name);
        const createdProfile = await addDoc(profileCollection, {
          email: user.email,
          name: user.name,
          url: finalUrl,
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          stories: [],
          bio: "Enter your Bio",
          public: true,
          userId: user.uid,
          createdAt: new Date(),
        });
        console.log(createdProfile);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }

      console.log("success");
    } else {
      let data = querySnapshot.docs[0].data();
      console.log(data);
    }
  };

  const updateProfile = async (documentId, field, newValue) => {
    //
    try {
      const profileRef = doc(db, "profiles", documentId);
      const updateObject = {};
      updateObject[field] = newValue;

      await updateDoc(profileRef, updateObject);

      console.log(`Profile ${documentId} updated successfully.`);
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const deleteProfile = async () => {
    console.log("profile deleted");
  };

  return {
    fetchProfile,
    updateProfile,
    deleteProfile,
    loading,
  };
};
