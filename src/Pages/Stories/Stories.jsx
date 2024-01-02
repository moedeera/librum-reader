import { Block4 } from "../../Components/Block4/Block4";
import "./Stories.css";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const Stories = () => {
  const { search } = useParams();
  console.log(search);
  async function updateStoriesWithSlug() {
    const wasItSet = localStorage.getItem("summary-slugs-created-2");
    if (wasItSet) {
      return;
    }

    try {
      // Reference to the stories collection
      const storiesRef = collection(db, "summaries");

      // Get a snapshot of the stories collection
      const snapshot = await getDocs(storiesRef);

      // Update each document in the collection
      const updatePromises = snapshot.docs.map(async (document) => {
        console.log(document.data());
        // Construct the slug using the document id and the link attribute
        const slug = `${document.id}-${document.data().link}`;
        const storyDoc = doc(db, "summaries", document.id);
        // Update the document with the new slug attribute
        // await storiesRef.doc(doc.id).update({ slug: slug });
        await updateDoc(storyDoc, { slug: slug });
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);
      localStorage.setItem("summary-slugs-created-2", true);
      console.log("All stories have been updated with slugs.");
    } catch (error) {
      console.error("Error updating stories with slugs:", error);
    }
  }
  const fetchStory = async (idOrSlug) => {
    let matchedStories = [];
    try {
      // Reference to the stories collection
      const storiesRef = collection(db, "stories");

      // Query the stories collection for the first document with the specified slug
      const q = query(
        storiesRef,
        where("slug", "==", "3Zktmck8E77mUpxzVmRK-art-innovation")
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No matching slugs.");
        const storyDoc = doc(db, "stories", idOrSlug);
        const docSnapshot = await getDoc(storyDoc);

        if (docSnapshot.exists()) {
          const summaryData = docSnapshot.data();
          return summaryData;
        }

        return null;
      } else {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          matchedStories.push(doc.data());
        });
      }

      // Return the first document found
      console.log(matchedStories[0]);
      return matchedStories[0];
    } catch (error) {
      console.error("Error searching story by slug:", error);
      return null; // or handle the error as appropriate for your application
    }
  };

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
      })
      .catch((error) => {
        console.error("Failed to fetch story:", error);
      });
  }, []);

  // updateStoriesWithSlug();
  return (
    <div className="container">
      <div className="stories-page">
        {" "}
        <h3>Browse Short Stories</h3>
        <Block4 searchTerm={search} />
        <button className="btn btn-primary">More</button>
      </div>
    </div>
  );
};
