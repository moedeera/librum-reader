import { createContext, useContext, useState } from "react";
import { findImageSet, imagesSorted } from "../assets/images/images";
import { storiesInfo } from "./Content";
import { signInWithGoogle } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, db } from "../../firebase-config";

function getUserFromLocalStorage() {
  // Check if "user" exists in local storage
  const storedUser = localStorage.getItem("librum-user");
  console.log(storedUser);
  return storedUser ? JSON.parse(storedUser) : null;
  // Return the user if it exists, otherwise return null
}

export const SiteContext = createContext({});

export const SiteContextProvider = ({ children }) => {
  const userInfo = getUserFromLocalStorage();
  const auth = getAuth(app);

  const menuItemsMD = [
    { id: 1, name: "Home", link: "/" },
    // { id: 2, name: "Stories", link: "/stories" },
    // { id: 3, name: "Write", link: "/write" },
    { id: 2, name: "Browse", link: "/stories" },
    { id: 4, name: "Contact", link: "/contact" },
    { id: 5, name: "About", link: "/about" },
  ];
  const menuItemsLG = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Login", link: "/login" },
    { id: 3, name: "Browse", link: "/stories" },
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
  ];

  const [story, setStory] = useState("Your Story");
  const [user, setUser] = useState(userInfo);
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
      .then(() => {
        // Signed in
        console.log("success");
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  };

  const loginWithEmailAndPassword = async (userInfo, redirection, link) => {
    console.log(
      "on log called",
      "user info:",
      userInfo.email,
      userInfo.password
    );

    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        setUser(userCredential.user);
        localStorage.setItem("librum-user", user);
        redirection(link);
        // ...
      })
      .catch((error) => {
        console.log("error code:", error.code, "error message:", error.message);
      });
  };

  const signInWithGoogleFunction = async () => {
    const userInfo = await signInWithGoogle();

    setUser(userInfo);
  };

  const isEmailValid = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  console.log(isEmailValid("jj@gmail.com"));
  // const htmlContent = "<b>Hello </b><strong>World!</strong><br>";
  // const quillDelta = parseHtmlToQuillDelta(htmlContent);
  // console.log(JSON.stringify(quillDelta, null, 2));

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
        user,
        setUser,
        signInWithGoogleFunction,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
        isEmailValid,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
