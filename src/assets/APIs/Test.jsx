//old code
// const fetchStoryBySlugOrId = async (slugOrId) => {
//   try {
//     // Reference to the stories collection
//     const storiesRef = collection(db, "stories");

import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { query } from "express";

//     // First, attempt to fetch the document assuming slugOrId is an ID
//     const docRef = doc(storiesRef, slugOrId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       // Document found with the provided ID, return this document
//       console.log("Document found with ID:", slugOrId);
//       return docSnap.data();
//     } else {
//       // No document found with the ID, proceed to assume slugOrId is a slug
//       console.log("No document found with ID. Trying as slug...");

//       // Query the stories collection for the document with the specified slug
//       const q = query(storiesRef, where("slug", "==", slugOrId));
//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         console.log("No matching documents with slug.");
//         return null;
//       } else {
//         // Assuming slug is unique and you want only the first matching document
//         const firstDoc = querySnapshot.docs[0];
//         console.log("Document found with slug:", slugOrId);
//         return firstDoc.data();
//       }
//     }
//   } catch (error) {
//     console.error("Error searching story by slugOrId:", error);
//     return null; // or handle the error as appropriate for your application
//   }
// };
const fetchStoryBySlugOrId = async (slugOrId) => {
  console.log(slugOrId);
  try {
    const storiesRef = collection(db, "stories");
    const docRef = doc(storiesRef, slugOrId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document found with ID:", slugOrId);
      return docSnap.data();
    } else {
      console.log("No document found with ID. Trying as slug...");
      const q = query(storiesRef, where("slug", "==", slugOrId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents with slug.");
        throw new Error("No matching documents found."); // Throw an error when no documents are found
      } else {
        const firstDoc = querySnapshot.docs[0];
        console.log("Document found with slug:", slugOrId);
        return firstDoc.data();
      }
    }
  } catch (error) {
    console.error("Error searching story by slugOrId:", error);
    throw error; // Propagate the error
  }
};
