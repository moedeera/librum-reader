import { db } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

// Check if the URL property is already in use
const profileCollection = collection(db, "profiles");
// Check if the URL property is already in use
const draftCollection = collection(db, "drafts");

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
function appendStringWithDateTime(inputString, inputSlug) {
  //
  const refurbishedString = inputString.replace(/\s/g, "").toLocaleLowerCase();

  // Create a new Date object for the current time
  const now = new Date();

  // Extract and format the day
  const day = now.getDate().toString().padStart(2, "0");

  // Extract and format the month (getMonth returns 0-11, hence add 1)
  const month = (now.getMonth() + 1).toString().padStart(2, "0");

  // Extract and format the year to last two digits
  const year = now.getFullYear().toString().slice(-2);

  // Extract and format the hours
  const hours = now.getHours().toString().padStart(2, "0");

  // Extract and format the minutes
  const minutes = now.getMinutes().toString().padStart(2, "0");

  // Extract and format the seconds
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Concatenate all parts with the input string
  return `${refurbishedString}${day}${month}${year}${hours}${minutes}${seconds}${inputSlug}`;
}

// Example usage:
const result = appendStringWithDateTime("hello");
console.log(result);

// Check if there are already 100 'profile' documents
const checkProfileLimit = async () => {
  const profilesQuery = query(profileCollection);
  const querySnapshot = await getDocs(profilesQuery);
  if (querySnapshot.docs.length >= 100) {
    return { error: "Profile limit reached. Cannot create more profiles." };
  }
  return { error: null };
};

export { checkURLAvailability, checkProfileLimit, appendStringWithDateTime };
