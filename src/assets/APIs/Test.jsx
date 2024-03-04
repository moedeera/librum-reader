//old code
// const fetchStoryBySlugOrId = async (slugOrId) => {
//   try {
//     // Reference to the stories collection
//     const storiesRef = collection(db, "stories");

import { db } from "firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const updateSingleDocStats = async (id) => {
  console.log(id);
  const story = doc(db, "summaries", id);
  let storyInfo = await getDoc(story);
  const newStats = [0, 0, 0];
  await updateDoc(storyInfo, { stats: newStats });
};

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
