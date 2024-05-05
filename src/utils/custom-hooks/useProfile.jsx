import { useContext, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { checkURLAvailability } from "../functions/functions";

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileCollection = collection(db, "profiles");
  const draftCollection = collection(db, "drafts");

  const auth = getAuth();

  const getProfile = async (url) => {
    console.log(url);
    try {
      const q = query(profileCollection, where("url", "==", url));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error("No such profile");
      }
      let data = querySnapshot.docs[0].data();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchProfile = async () => {
    const user = auth.currentUser;
    // console.log(user);

    const q = query(profileCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    setLoading(true);
    if (querySnapshot.empty) {
      console.log("no such profile, creating new profile.....");
      try {
        const finalUrl = await checkURLAvailability(user.name);
        const createdProfileRef = await addDoc(profileCollection, {
          email: user.email,
          name: user.name,
          url: finalUrl,
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          stories: [],
          followers: [],
          bio: "Enter your Bio",
          public: true,
          userId: user.uid,
          createdAt: new Date(),
        });
        console.log(createdProfileRef);
        let createdProfile = await getDoc(profileCollection, createdProfileRef);
        return createdProfile.docs[0].data;
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
      return data;
    }
  };

  const updateUserProfile = async (userId, field, newValue) => {
    try {
      const q = query(profileCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No such account exists");
      } else {
        // Use .ref to get the document reference from the query snapshot
        let accountRef = querySnapshot.docs[0].ref;

        const updateObject = {};
        updateObject[field] = newValue;
        await updateDoc(accountRef, updateObject);
        if (field === "name") {
          const q = query(draftCollection, where("userId", "==", userId));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            console.log("no draft to update");
          } else {
            querySnapshot.forEach(async (draftDoc) => {
              const draftRef = doc(db, "drafts", draftDoc.id);
              await updateDoc(draftRef, {
                authorName: newValue, // Setting the name property to "John Woods"
              });
              console.log(`Updated draft ${draftDoc.id} to ${newValue}`);
            });

            console.log("changing profile auth name...");
            await updateProfile(auth.currentUser, {
              displayName: newValue,
            });
          }
        }

        console.log(`Account ${userId} updated successfully.`);
      }
    } catch (error) {
      console.error("Error updating account: ", error);
      throw error; // Re-throw to allow further handling by the component
    }
  };

  const deleteProfile = async () => {
    console.log("profile deleted");
  };

  return {
    fetchProfile,
    updateUserProfile,
    deleteProfile,
    loading,
    getProfile,
  };
};
