import { db } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

// Check if the URL property is already in use
const profileCollection = collection(db, "profiles");
// Check if the URL property is already in use
const storyCollection = collection(db, "stories");

const checkURLAvailability = async (url) => {
  const searchUrl = url.replace(/\s/g, "").toLocaleLowerCase();
  const urlQuery = query(storyCollection, where("url", "==", searchUrl));
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()]; // Get month name from array
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with zero if needed
  const year = date.getFullYear().toString(); // Get  year

  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and pad with zero if needed
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with zero if needed

  return `${month} ${day} ${year} at ${hours}:${minutes}`; // Construct the string in desired format
}

const getPathFromUrl = (url) => {
  const path = new URL(url).pathname;
  // Assuming URL format: https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT.appspot.com/o/IMAGES_PATH%2FimageName.jpg?...
  // Extract the path after '/o/'
  const decodedPath = decodeURIComponent(path); // Handle URL encoding
  return decodedPath.split("/").slice(3).join("/").split("?")[0]; // Adjust slicing based on your actual URL structure
};

let x = {
  seconds: 1714289077,
  nanoseconds: 769000000,
};

function formatTimestamp(timestamp) {
  // Convert the timestamp to a JavaScript Date object
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  // Helper to add leading zeros
  const pad = (num) => (num < 10 ? "0" + num : num);

  // Extract components from the date
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();
  const hour = date.getHours();
  const minute = pad(date.getMinutes());
  const ampm = hour >= 12 ? "PM" : "AM";
  const hourFormatted = hour % 12 || 12; // Convert 24h to 12h format and adjust 0 o'clock to 12

  // Format "Month Day Year at Hour:Minute AM/PM"
  let formattedDate = `${month} ${day}`;
  if (year !== currentYear) {
    formattedDate += ` ${year}`;
  }
  formattedDate += ` at ${hourFormatted}:${minute} ${ampm}`;

  return formattedDate;
}
function getWordCount(quill) {
  const text = quill.getText(); // Get the plain text
  const trimmedText = text.trim(); // Trim leading and trailing whitespace
  if (trimmedText.length === 0) {
    return 0; // Return zero if the text is empty
  }
  // Split the text by whitespace and count the resulting array elements
  const words = trimmedText.split(/\s+/);
  return words.length;
}

export {
  checkURLAvailability,
  checkProfileLimit,
  appendStringWithDateTime,
  checkForRestrictedWords,
  arraysEqual,
  getCurrentDateFormatted,
  getPathFromUrl,
  formatTimestamp,
  getWordCount,
};
