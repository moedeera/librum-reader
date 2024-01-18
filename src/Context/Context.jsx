import { createContext, useContext, useEffect, useState } from "react";
import { findImageSet, imagesSorted } from "../assets/images/images";
import { storiesInfo } from "./Content";
import { signInWithGoogle } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, db } from "../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function getUserFromLocalStorage() {
  // Check if "user" exists in local storage
  const storedUser = localStorage.getItem("librum-user");
  // console.log(storedUser);
  return storedUser ? JSON.parse(storedUser) : null;
  // Return the user if it exists, otherwise return null
}
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
        category: "",
        comments: [],
        likes: 0,
        views: 0,
      };
};
const data = [
  {
    attributes: {
      color: "var(--tw-prose-bold)",
      bold: true,
    },
    insert: "The Spark of Innovation",
  },
  {
    insert:
      "\nIt all begins with a spark—a flicker of an idea that has the potential to change the world. This initial spark can be triggered by various sources: a pressing problem, a customer's unmet need, or simply a wild dream. The business mogul recounts how their own journey of innovation began with a moment of clarity. They were inspired by a desire to solve a prevalent issue in their industry, something that had eluded even the brightest minds for years.\nBut the spark of innovation is not enough; it's just the beginning. To transform that spark into a blazing fire of creativity, one must nurture it with knowledge, curiosity, and a relentless pursuit of excellence.\n\n",
  },
  {
    attributes: {
      color: "var(--tw-prose-bold)",
      bold: true,
    },
    insert: "The Role of Research and Knowledge",
  },
  {
    insert:
      "\nInnovation is not just about having a brilliant idea; it's about knowing how to execute it effectively. The business mogul emphasizes the significance of research and knowledge as the foundation of their creative journey. They believe that a deep understanding of their industry, its trends, and its pain points is crucial.\nTo gain this knowledge, they invested time in reading, attending conferences, and networking with experts. They understood that innovation is often the result of connecting seemingly unrelated dots, and the broader their knowledge base, the more dots they could connect. This continuous pursuit of knowledge became the cornerstone of their creative process.\n\n",
  },
  {
    attributes: {
      color: "var(--tw-prose-bold)",
      bold: true,
    },
    insert: "Embracing Challenges as Catalysts",
  },
  {
    insert:
      "\nThe road to innovation is rarely smooth; it's riddled with obstacles, doubts, and setbacks. The business mogul speaks candidly about the numerous challenges they faced along the way. These challenges were not roadblocks but rather catalysts that fueled their creativity.\nThey share stories of sleepless nights, failed prototypes, and skeptical investors. Each setback was a valuable lesson, an opportunity to refine their idea, and an invitation to think outside the box. The ability to embrace challenges as stepping stones to success became a defining characteristic of their creative journey.\n\n",
  },
  {
    attributes: {
      color: "var(--tw-prose-bold)",
      bold: true,
    },
    insert: "Collaboration and Teamwork",
  },
  {
    insert:
      "\nInnovation is not a solitary endeavor. The business mogul acknowledges the pivotal role that collaboration and teamwork played in their journey. They surrounded themselves with a diverse team of talented individuals who shared their passion for the idea.\nThe power of diverse perspectives cannot be overstated. The mogul describes how brainstorming sessions often led to unexpected breakthroughs, as team members from different backgrounds brought fresh ideas and viewpoints to the table. It was through collaboration that their initial spark evolved into a fully-fledged innovation.\n\n",
  },
  {
    attributes: {
      color: "var(--tw-prose-bold)",
      bold: true,
    },
    insert: "The Art of Iteration",
  },
  {
    insert:
      "\nCreating groundbreaking innovations is rarely a one-shot affair. The mogul stresses the importance of iteration in the creative process. They recount how they continuously refined their product, incorporating user feedback and staying attuned to evolving market demands.\nThe art of iteration is not just about making minor tweaks; it's about having the courage to pivot when necessary. Sometimes, the path to innovation requires changing course entirely, and the mogul shares their experiences of recognizing when to pivot and when to persevere.\n\n",
  },
  {
    attributes: {
      color: "var(--tw-prose-bold)",
      bold: true,
    },
    insert: "Fostering a Culture of Creativity",
  },
  {
    insert:
      "\nAs their journey unfolded, the business mogul realized the significance of fostering a culture of creativity within their organization. They cultivated an environment where employees were encouraged to experiment, take risks, and think innovatively. This culture of creativity extended beyond the R&D department; it permeated every aspect of their company.\nThey also stressed the importance of celebrating failures as valuable learning experiences. In a culture that embraced both success and failure, employees felt empowered to push the boundaries of what was possible.\n\n",
  },
  {
    attributes: {
      color: "var(--tw-prose-bold)",
      bold: true,
    },
    insert: "The Science of Execution",
  },
  {
    insert:
      "\nInnovation is not just about creativity; it's also about execution. The business mogul underscores the importance of having a robust strategy for bringing innovations to market. This involves careful planning, resource allocation, and a clear understanding of the competitive landscape.\nThey speak of the need to secure funding, build partnerships, and create a compelling narrative that resonates with customers and investors alike. The science of execution, they emphasize, is what transforms a brilliant idea into a successful product or service.\nIn conclusion, the journey of creating groundbreaking innovations is a complex, multifaceted odyssey. It begins with a spark of inspiration but requires the nurturing of creativity through research, resilience in the face of challenges, collaboration with diverse teams, and a commitment to continuous iteration. Fostering a culture of creativity and executing the innovation effectively are also crucial elements of this journey. The business mogul's reflections provide a roadmap for aspiring innovators, shedding light on the art and science of turning visionary ideas into reality.\n",
  },
];
export const SiteContext = createContext({});

// eslint-disable-next-line react/prop-types
export const SiteContextProvider = ({ children }) => {
  const userInfo = getUserFromLocalStorage();
  const auth = getAuth(app);
  const createdStory = fetchCreatedStoryInfo();

  const menuItemsMD = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Browse", link: "/stories" },
    { id: 3, name: "Contact", link: "/contact" },
    { id: 4, name: "About", link: "/about" },
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
  const fetchedProfile = getProfileFromLocalStorage();
  const [profileInfo, setProfileInfo] = useState(fetchedProfile);
  const [story, setStory] = useState(createdStory);
  const savedStoryId = getStoryIdfromLocalStorage();

  const [user, setUser] = useState(userInfo);
  const [storyId, setStoryId] = useState(savedStoryId);
  const fbProfile = collection(db, "profile");
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
          messageS: [],
          gender: null,
          dob: null,
          bio: "Enter your Bio",
          status: "public",
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

  const loginWithEmailAndPassword = async (userInfo, redirection, link) => {
    console.log(
      "on log called",
      "user info:",
      userInfo.email,
      userInfo.password
    );

    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(async (userCredential) => {
        // Signed in
        localStorage.setItem("librum-user", JSON.stringify(userInfo));
        console.log(userCredential.user.email);
        setUser(userCredential.user);
        const profileRef = collection(db, "profile");
        const q = query(
          profileRef,
          where("email", "==", userCredential.user.email)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("no such profile");
        } else {
          let data = querySnapshot.docs[0].data();
          setProfileInfo(data);
          localStorage.setItem("librum-profile", JSON.stringify(data));
        }

        redirection(link);
        // ...
      })
      .catch((error) => {
        console.log("error code:", error.code, "error message:", error.message);
      });
  };

  const signInWithGoogleFunction = async () => {
    const userInfo = await signInWithGoogle();
    console.log(userInfo);
    localStorage.setItem("librum-user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const isEmailValid = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Update story
  useEffect(() => {
    console.log("updating value....");
    localStorage.setItem("created-story-info", JSON.stringify(story));
  }, [story]);

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
        storyId,
        setStoryId,
        data,
        profileInfo,
        setProfileInfo,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
