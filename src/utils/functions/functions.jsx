import { db } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

// Check if the URL property is already in use
const profileCollection = collection(db, "profiles");

const checkURLAvailability = async (url) => {
  const searchUrl = url.replace(/\s/g, "").toLocaleLowerCase();
  const urlQuery = query(profileCollection, where("url", "==", searchUrl));
  const urlSnapshot = await getDocs(urlQuery);
  if (urlSnapshot.docs.length > 0) {
    // URL is in use, modify it by appending a random number
    const randomNumber = Math.floor(Math.random() * 1001); // random number between 0 and 1000
    return `${searchUrl}${randomNumber}`;
  }
  return searchUrl;
};

// Check if there are already 100 'profile' documents
const checkProfileLimit = async () => {
  const profilesQuery = query(profileCollection);
  const querySnapshot = await getDocs(profilesQuery);
  if (querySnapshot.docs.length >= 100) {
    return { error: "Profile limit reached. Cannot create more profiles." };
  }
  return { error: null };
};

export { checkURLAvailability, checkProfileLimit };
