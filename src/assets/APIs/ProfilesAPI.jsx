import { collection, doc, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { query } from "express";

// const fetchProfile = async (name) => {
//   // Reset profile data

//   // Create a query against the collection.
//   const q = query(collection(db, "profiles"), where("name", "==", name));

//   const querySnapshot = await getDocs(q);
//   const profiles = [];
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     profiles.push(doc.data());
//   });

//   // Assuming you want the first document that matches
//   if (profiles.length > 0) {
//     console.log(profiles[0]);
//   } else {
//     console.log("No such document!");
//   }
// };

// export { fetchProfile };
