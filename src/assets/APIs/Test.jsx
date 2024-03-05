import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-config";

const updateSingleSummaryStat = async (id, updatedStats) => {
  try {
    const summariesData = collection(db, "summaries");
    let querySnapshot;

    const q = query(summariesData, where("ref", "==", id));
    querySnapshot = await getDocs(q);

    const summary = querySnapshot.docs[0];
    const updatedSummary = await updateDoc(summary, { stats: updatedStats });

    console.log(updatedSummary);
  } catch (error) {
    console.log("error:", error);
  }
};
