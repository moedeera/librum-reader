import { db } from "firebase-config";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const auth = getAuth();
// Editing a profile
const handleEditProfile = async () => {
  // Get the profile documents reference set up
  const profileRef = collection(db, "profile");

  // initialize document id
  let documentId;
  // search for specific profile using email
  const q = query(profileRef, where("email", "==", auth.currentUser.email));
  const querySnapshot = await getDocs(q);
  // if no such profile exists return
  if (querySnapshot.empty) {
    console.log("no such profile");
    return;
  } else {
    documentId = querySnapshot.docs[0].id;
  }
  // if it does, update the profile
  try {
    const updateObject = {};
    updateObject.name = "Changed Name";
    await updateDoc(profileRef, updateObject);
    console.log(`Profile ${documentId} updated successfully.`);
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
};
