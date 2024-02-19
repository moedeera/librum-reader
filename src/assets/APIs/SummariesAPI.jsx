import { collection, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { query } from "express";

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

export { fetchSummariesData, fetchFilteredSummariesData };
