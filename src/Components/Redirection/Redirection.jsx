import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-config";

export const Redirection = () => {
  const { storyidorslug } = useParams();
  const navigate = useNavigate();

  const storyData = collection(db, "stories");
  const [loading, setLoading] = useState(true);

  const stories = collection(db, "summaries");

  const fetchStoryBySlugOrId = async (slugOrId) => {
    try {
      // Reference to the stories collection
      const storiesRef = collection(db, "stories");

      // First, attempt to fetch the document assuming slugOrId is an ID
      const docRef = doc(storiesRef, slugOrId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Document found with the provided ID, return this document
        console.log("Document found with ID:", slugOrId);
        return docSnap.data();
      } else {
        // No document found with the ID, proceed to assume slugOrId is a slug
        console.log("No document found with ID. Trying as slug...");

        // Query the stories collection for the document with the specified slug
        const q = query(storiesRef, where("slug", "==", slugOrId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No matching documents with slug.");
          return null;
        } else {
          // Assuming slug is unique and you want only the first matching document
          const firstDoc = querySnapshot.docs[0];
          console.log("Document found with slug:", slugOrId);
          return firstDoc.data();
        }
      }
    } catch (error) {
      console.error("Error searching story by slugOrId:", error);
      return null; // or handle the error as appropriate for your application
    }
  };

  // Usage Example
  const [value, setValue] = useState(null);
  useEffect(() => {
    fetchStoryBySlugOrId("3Zktmck8E77mUpxzVmRK")
      .then((match) => {
        setValue(match); // This will log the actual document data or null

        console.log(match, value);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch story:", error);
      });
  }, []);
  if (loading) {
    return <Loading />;
  }

  return <div>Redirection</div>;
};
