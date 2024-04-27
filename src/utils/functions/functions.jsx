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
function checkForRestrictedWords(word) {
  const input = word.toLowerCase(); // Convert input to lowercase to make the check case-insensitive
  const restrictedWords = [
    "fuck",
    "sex",
    "ass ",
    "tits",
    "dick",
    "penis",
    "shit",
    "bitch",
    "hoe ",
    "boobs",
    "pussy",
    "vagina",
    "porn",
    "butt ",
    "booty",
    "cock ",
    "titties",
    "suck",
    "blowjob",
    "handjob",
    "buttfuck",
    "cocksucker",
    "asslick",
    "nigger",
    "nigga",
  ];

  // Check if any restricted word is in the input
  const isRestricted = restrictedWords.some((word) => input.includes(word));
  if (isRestricted) {
    return "Error: The input contains restricted words.";
  } else {
    return "Input is valid.";
  }
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getCurrentDateFormatted() {
  const date = new Date();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()]; // Get month name from array
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with zero if needed
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of year

  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and pad with zero if needed
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with zero if needed

  return `${month} ${day} ${year} at ${hours} ${minutes}`; // Construct the string in desired format
}

const getPathFromUrl = (url) => {
  const path = new URL(url).pathname;
  // Assuming URL format: https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT.appspot.com/o/IMAGES_PATH%2FimageName.jpg?...
  // Extract the path after '/o/'
  const decodedPath = decodeURIComponent(path); // Handle URL encoding
  return decodedPath.split("/").slice(3).join("/").split("?")[0]; // Adjust slicing based on your actual URL structure
};

export {
  checkURLAvailability,
  checkProfileLimit,
  appendStringWithDateTime,
  checkForRestrictedWords,
  arraysEqual,
  getCurrentDateFormatted,
  getPathFromUrl,
};
