import { createContext, useEffect, useState } from "react";
import { findImageSet, imagesSorted } from "../assets/images/images";
import { storiesInfo } from "./Content";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../../firebase-config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

function getProfileFromLocalStorage() {
  // Check if "user" exists in local storage
  const storedProfile = localStorage.getItem("librum-profile");
  // console.log(storedUser);
  return storedProfile ? JSON.parse(storedProfile) : null;
  // Return the user if it exists, otherwise return null
}

function getStoryIdfromLocalStorage() {
  // Check if "user" exists in local storage
  const storedId = localStorage.getItem("storyId");
  // console.log(storedUser);
  return storedId ? JSON.parse(storedId) : null;
  // Return the user if it exists, otherwise return null
}
const fetchCreatedStoryInfo = () => {
  const storedInfo = localStorage.getItem("created-story-info");
  return storedInfo
    ? JSON.parse(storedInfo)
    : {
        author: "",
        authorPic: "",
        id: "",
        ref: "",
        title: "Your Story",
        summary: "",
        public: true,
        picture: "",
        tags: [],
        category: "General",
        comments: [],
        likes: 0,
        views: 0,
      };
};

export const SiteContext = createContext({});

// eslint-disable-next-line react/prop-types
export const SiteContextProvider = ({ children }) => {
  const auth = getAuth(app);
  const createdStory = fetchCreatedStoryInfo();

  const websiteTitle = ["Librum", "Reader"];

  const menuItemsMD = [
    { id: 1, name: "Home", link: "/", status: "all" },
    { id: 2, name: "Browse", link: "/browse/all", status: "all" },
    { id: 3, name: "Community", link: "/community", status: "all" },
    { id: 4, name: "About", link: "/about", status: "guest" },
    { id: 5, name: "Write", link: "/write", status: "user" },
    { id: 6, name: "Updates", link: "/Updates", status: "user" },
  ];
  const menuItemsLG = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Login", link: "/login" },
    { id: 3, name: "Browse", link: "/browse/all" },
    { id: 4, name: "Community", link: "/community", status: "user" },
    // { id: 3, name: "Stories", link: "/stories" },
    // { id: 4, name: "Write", link: "/write" },
    { id: 5, name: "About", link: "/about" },
    { id: 6, name: "FAQ", link: "/" },
    { id: 7, name: "Contact", link: "/contact" },
    { id: 8, name: "Popular", link: "/" },
  ];

  const menuAlt = [
    { id: 1, name: "Terms of Use", link: "/" },
    { id: 2, name: "Privacy Policy", link: "/" },
    { id: 3, name: "Copyright Policy", link: "/" },
    { id: 4, name: "Contact", link: "/contact", status: "guest" },
  ];

  const dropDownLinks = [
    { id: 1, name: "My Profile", to: "/profile" },
    { id: 2, name: "My Stories", to: "/mystories" },
    { id: 3, name: "Messages", to: "/messages" },
    { id: 4, name: "Settings", to: "/settings" },
  ];
  const fetchedProfile = getProfileFromLocalStorage();
  const [profileInfo, setProfileInfo] = useState(fetchedProfile);
  const [story, setStory] = useState(createdStory);
  const savedStoryId = getStoryIdfromLocalStorage();

  const [storyId, setStoryId] = useState(savedStoryId);
  const fbProfile = collection(db, "profile");
  const [storyImage, setStoryImage] = useState(null);

  function parseHtmlToQuillDelta(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const quillDelta = [];

    const parseNode = (node) => {
      const insert = {};

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.replace(/\n/g, "\n"); // Replace newline characters
        if (text.trim()) {
          insert.insert = text;
          quillDelta.push(insert);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName;

        switch (tagName) {
          case "B":
          case "STRONG":
            insert.insert = node.textContent;
            insert.attributes = { bold: true };
            quillDelta.push(insert);
            break;
          case "I":
          case "EM":
            insert.insert = node.textContent;
            insert.attributes = { italic: true };
            quillDelta.push(insert);
            break;
          case "U":
            insert.insert = node.textContent;
            insert.attributes = { underline: true };
            quillDelta.push(insert);
            break;
          case "A":
            insert.insert = node.textContent;
            insert.attributes = { link: node.getAttribute("href") };
            quillDelta.push(insert);
            break;
          case "BR":
            insert.insert = "\n";
            quillDelta.push(insert);
            break;
          default:
            if (node.childNodes.length > 0) {
              const childNodes = node.childNodes;
              childNodes.forEach((childNode) => parseNode(childNode));
            }
            break;
        }
      }
    };

    doc.body.childNodes.forEach((node) => parseNode(node));

    return quillDelta;
  }

  const registerWithEmailAndPassword = async (newUser) => {
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async () => {
        // Signed in
        const randomNumber =
          Math.floor(Math.random() * (19999 - 10000 + 1)) + 10000;
        const randomNumber2 = Math.floor(Math.random() * (199 - 100 + 1)) + 100;

        await addDoc(fbProfile, {
          email: newUser.email,
          name: newUser.name,
          profileName: `user-${randomNumber}-${randomNumber2}`,
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          stories: [],
          messages: [],
          gender: null,
          dob: null,
          bio: "Enter your Bio",
          public: false,
        });

        console.log("success");
        return true;
        // ...
      })
      .catch((error) => {
        console.log(error);
        return false;
        // ..
      });
  };

  const isEmailValid = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const updateProfile = async (documentId, field, newValue) => {
    try {
      const profileRef = doc(db, "profile", documentId);
      const updateObject = {};
      updateObject[field] = newValue;

      await updateDoc(profileRef, updateObject);
      console.log(`Profile ${documentId} updated successfully.`);
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };
  // Update story
  // useEffect(() => {
  //   console.log("updating value....");
  //   localStorage.setItem("created-story-info", JSON.stringify(story));
  // }, [story]);

  // useEffect(() => {
  //   console.log(storyImage);
  // }, [storyImage]);

  return (
    <SiteContext.Provider
      value={{
        menuItemsMD,
        menuItemsLG,
        imagesSorted,
        findImageSet,
        menuAlt,
        parseHtmlToQuillDelta,
        storiesInfo,
        story,
        setStory,
        registerWithEmailAndPassword,
        isEmailValid,
        storyId,
        setStoryId,
        profileInfo,
        setProfileInfo,
        updateProfile,
        dropDownLinks,
        websiteTitle,
        storyImage,
        setStoryImage,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
