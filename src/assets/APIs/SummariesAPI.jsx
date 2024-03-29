import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-config";

const summariesData = collection(db, "summaries");
const fetchSummariesData = async () => {
  try {
    const data = await getDocs(summariesData);
    const summariesInfo = data.docs.map((doc) => ({
      ...doc.data(),
      storyId: doc.id,
    }));

    return summariesInfo;
  } catch (error) {
    console.log("error:", error);

    return error;
  }
};

const fetchFilteredSummariesData = async (search) => {
  try {
    // Check if searchTerm is provided
    let querySnapshot;

    // Create a query against the 'summaries' collection where 'tag' array contains 'searchTerm'
    const q = query(summariesData, where("tag", "array-contains", search));
    querySnapshot = await getDocs(q);

    const summariesInfo = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      storyId: doc.id,
    }));

    return summariesInfo;
  } catch (error) {
    console.log("error:", error);
    // fix this
  }
};

const updateAllSummaryStats = async () => {
  const summariesCollectionRef = collection(db, "summaries");
  const snapshot = await getDocs(summariesCollectionRef);

  const newStats = [0, 0, 0];
  const updatePromises = [];

  snapshot.forEach((doc) => {
    // For each document, prepare an update operation
    const docRef = doc.ref; // Get a reference to the document
    updatePromises.push(updateDoc(docRef, { stats: newStats })); // Update the document
  });

  // Wait for all update operations to complete
  try {
    await Promise.all(updatePromises);
    console.log("All documents have been successfully updated.");
  } catch (error) {
    console.error("Error updating documents:", error);
  }
};

const updateSingleSummaryStat = async (id, updatedStats) => {
  if (id === undefined || id === null) {
    console.log("undefined id");
    return;
  }
  if (updatedStats === undefined) {
    console.log("no valid stats");
    return;
  }

  console.log(id, updatedStats);
  try {
    // Directly reference the document by its ID within the "summaries" collection
    const summaryRef = doc(db, "summaries", id);

    // Update the document with the new stats
    await updateDoc(summaryRef, { stats: updatedStats });

    console.log("Summary updated successfully.");
  } catch (error) {
    console.log("error:", error);
  }
};

export {
  fetchSummariesData,
  fetchFilteredSummariesData,
  updateAllSummaryStats,
  updateSingleSummaryStat,
};
