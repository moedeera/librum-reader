import { SiteContext } from "@/Context/Context";
import { db } from "../../../firebase-config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "@/utils/custom-hooks/useAuth";
import { useAccount } from "@/utils/custom-hooks/useAccount";
import { useProfile } from "@/utils/custom-hooks/useProfile";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { AuthContext } from "@/Context/AuthContext";
import { fetchProfile } from "@/assets/APIs/StoriesAPI";
import { loremIpsum } from "@/Context/Content";
import {
  appendStringWithDateTime,
  generateTags,
} from "@/utils/functions/functions";
import { getRandomItem, randomLiterature } from "./Content";

let names = [
  "John",
  "Adam",
  "Brianna",
  "Corey",
  "Deanna",
  "Edward",
  "Faith",
  "George",
  "Helen",
  "Issac",
];
let lastNames = [
  "Smith",
  "Jones",
  "Williams",
  "Stevens",
  "Johnson",
  "Scott",
  "MacDonald",
  "Hughes",
  "Kirk",
  "Connell",
];
const number1 = Math.floor(Math.random() * 10);
const number2 = Math.floor(Math.random() * 10);
const AuthPage = () => {
  const randomStory = getRandomItem(randomLiterature);
  const { signInWithGoogleFunction } = useAuth();
  const { user } = useContext(AuthContext);
  const { updateAccount, fetchAccount } = useAccount();
  const { createDraft } = useDraft();
  const { updateUserProfile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [randomNumber, setRandomNumber] = useState(58);
  const auth = getAuth();
  const [profile, setProfile] = useState({
    id: "null",
    name: "john smith",
  });
  const [account, setAccount] = useState({
    id: "null",
    genres: ["null", "null", "null"],
  });
  const fbProfile = collection(db, "profiles");
  const accountsCollection = collection(db, "accounts");
  const draftsCollection = collection(db, "drafts");
  // login with email and password
  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, "testing@gmail.com", "abc123")
      .then(async (userCredential) => {
        // Signed in
        // localStorage.setItem("librum-user", JSON.stringify(userInfo));
        const user = userCredential.user;
        console.log(userCredential.user);
        setCurrentUser(userCredential.user);
        if (!user.displayName || !user.photoURL) {
          try {
            await updateProfile(user, {
              displayName:
                user.displayName || `${names[number1]} ${lastNames[number2]}`,
              photoURL:
                user.photoURL ||
                "https://www.w3schools.com/howto/img_avatar.png",
            });
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.log("error code:", error.code, "error message:", error.message);
      });
  };
  // login with google
  const handleLoginWithGoogle = async () => {
    signInWithGoogleFunction();
  };
  const handleFetchProfile = async () => {
    console.log(auth.currentUser.email);

    const profileRef = collection(db, "profiles");
    const q = query(profileRef, where("email", "==", auth.currentUser.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("no such profile");
    } else {
      let data = querySnapshot.docs[0].data();
      setProfile(data);
      return data;
    }
  };
  //// updating profile
  const handleUpdateProfile = async () => {
    let newName = `${profile.name} ${number1}${number2}`;
    try {
      await updateUserProfile(profile.userId, "name", newName);
      setProfile({ ...profile, name: newName });
    } catch (error) {
      console.log(error);
    }
  };
  // handle fetch Account
  const handleFetchAccount = async () => {
    try {
      const data = await fetchAccount();
      setAccount(data);
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  };
  // updating account
  const handleUpdateAccount = async () => {
    try {
      await updateAccount(account.userId, "genres", [
        "fiction",
        "popular",
        "trending",
      ]);
      setAccount({ ...account, genres: ["fiction", "popular", "trending"] });
    } catch (error) {
      console.log(error);
    }
  };
  // Logging out authentication session
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  // User Registration/ Create new user profile
  const handleRegister = async () => {
    // Check if there are already 100 'profile' documents
    const checkProfileLimit = async () => {
      const profilesQuery = query(fbProfile);
      const querySnapshot = await getDocs(profilesQuery);
      if (querySnapshot.docs.length >= 100) {
        return { error: "Profile limit reached. Cannot create more profiles." };
      }
      return { error: null };
    };
    //
    // Check if the URL property is already in use
    const checkURLAvailability = async (url) => {
      const searchUrl = url.replace(/\s/g, "").toLocaleLowerCase();
      console.log(searchUrl);
      const urlQuery = query(fbProfile, where("url", "==", searchUrl));
      const urlSnapshot = await getDocs(urlQuery);
      if (urlSnapshot.docs.length > 0) {
        // URL is in use, modify it by appending a random number
        const randomNumber = Math.floor(Math.random() * 1001); // random number between 0 and 1000
        return `${searchUrl}${randomNumber}`;
      }
      return searchUrl;
    };

    try {
      const limitCheck = await checkProfileLimit();
      if (limitCheck.error) {
        alert(limitCheck.error);
        return;
      }
      const newUserEmail = `${names[number1]}${lastNames[number2][0]}-${randomNumber}@gmail.com`;
      const newUserPassword = "abc123"; // Consider using a more secure method of generating/storing passwords.
      const finalUrl = await checkURLAvailability(
        `${names[number1]}${lastNames[number2]}`
      );
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: `${names[number1]} ${lastNames[number2]}`,
        photoURL: "https://www.w3schools.com/howto/img_avatar.png",
        accountInfo: { messages: [], drafts: [], bookmarks: [], genres: [] },
      });

      // Add document to Firestore
      const createdProfile = await addDoc(fbProfile, {
        email: user.email,
        name: `${names[number1]} ${lastNames[number2]}`,
        url: finalUrl,
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        stories: [],
        followers: [],
        bio: "Enter your Bio",
        userId: user.uid,
        createdAt: new Date(),
      });
      const newUserAccount = await addDoc(accountsCollection, {
        name: `${names[number1]} ${lastNames[number2]}`,
        userId: user.uid,
        messages: [],
        drafts: [],
        stories: [],
        genres: [],
        bookmarks: [],
      });

      console.log(
        "User profile & account  created successfully",
        createdProfile,
        newUserAccount
      );
    } catch (error) {
      console.error("Error in user registration or profile creation:", error);
    }
  };
  // Editing a profile
  const handleEditProfile = async () => {
    setLoading(true);
    if (!auth.currentUser || !auth.currentUser.email) {
      console.log("No authenticated user or user email.");
      return;
    }

    const profileRef = collection(db, "profile");
    const q = query(profileRef, where("email", "==", auth.currentUser.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No such profile");
      return;
    }

    const documentId = querySnapshot.docs[0].id;
    const documentRef = doc(db, "profile", documentId);

    try {
      const updateObject = { name: "Changed Name" };
      await updateDoc(documentRef, updateObject);
      console.log(`Profile ${documentId} updated successfully.`);
    } catch (error) {
      console.error("Error updating profile: ", error);
    } finally {
      setLoading(false);
    }
  };
  // create draft
  const handleCreateDraft = async () => {
    let account;
    console.log(user);
    const accountCollection = collection(db, "accounts");
    try {
      const q = query(accountCollection, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setLoading(true);
      if (querySnapshot.empty) {
        throw new Error("No such profile");
      } else {
        account = querySnapshot.docs[0];
        console.log(account.data());
      }

      const profile = await handleFetchProfile();
      console.log(profile);
      let initialSLug = randomStory.title;

      const finalSlug = appendStringWithDateTime(initialSLug, profile.url);

      let keywords = [
        ...randomStory.tags,
        ...generateTags(randomStory.title, user.displayName),
      ];
      let uniqueKeywords = Array.from(new Set(keywords));
      let likes = number1 * 3;
      let views = number2;
      let newDraft = {
        authorName: user.displayName,
        userId: user.uid,
        authorPic: user.photoURL,
        category: randomStory.category,
        authorLink: profile.url,
        dateCreated: new Date(),
        lastEdited: new Date(),
        title: randomStory.title,
        synopsis: randomStory.synopsis,
        cover: randomStory.cover,
        story: randomStory.story,
        promoted: randomStory.promoted,
        wordCount: randomStory.wordCount,
        stats: [likes, views, 0],
        views: 0,
        likes: 0,
        keywords: uniqueKeywords,
        tags: randomStory.tags,
      };

      const createdDraft = await addDoc(draftsCollection, newDraft);
      const draftId = createdDraft.id;
      console.log(draftId);
      let updatedDrafts = [
        ...account.data().drafts,
        {
          draftId: draftId,
          dateCreated: new Date(),
          title: randomStory.title,
          cover: randomStory.cover,
        },
      ];
      await updateDoc(account.ref, { drafts: updatedDrafts });
      console.log(createdDraft);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log(auth.currentUser);
      const number = Math.floor(Math.random() * 1001);
      setRandomNumber(number);
    });

    return unsubscribe; // unsubscribe on unmount
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: "100px" }}>
        <h3>Loading</h3>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ paddingTop: "100px", paddingLeft: "10px" }}
    >
      <h3>Testing</h3>
      {currentUser ? (
        <>
          {" "}
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
          <br />
          <button
            className="btn"
            onClick={() => {
              handleUpdateProfile();
            }}
          >
            Update Profile {}
          </button>
          <br />
          <button
            className="btn"
            onClick={() => {
              handleUpdateAccount();
            }}
          >
            Update Account
          </button>
          <br />
          <div
            style={{
              border: "1px solid grey",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              maxWidth: "300px",
            }}
          >
            <div> {profile.userId}</div>
            <div> {profile.name}</div>
          </div>
          <br />
          <div
            style={{
              border: "1px solid grey",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              maxWidth: "300px",
            }}
          >
            <>{account.userId}</>
            <small>genres</small>
            {account.genres.map((genre, index) => (
              <div key={index}>{genre}</div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button onClick={handleLogin} className="btn">
            Login
          </button>
          <br />
          <button
            className="btn"
            onClick={() => {
              handleRegister();
            }}
          >
            Register
          </button>
        </>
      )}

      <br />

      {!currentUser && (
        <button onClick={handleLoginWithGoogle} className="btn">
          Google Login
        </button>
      )}

      <div>{currentUser ? <p>Login:true</p> : <p>Login:false</p>}</div>
      <br />
      <button
        className="btn"
        onClick={() => {
          handleCreateDraft();
        }}
      >
        create story draft
      </button>
      <br />
      <button
        className="btn"
        onClick={() => {
          handleFetchAccount();
        }}
      >
        Fetch Account
      </button>
      <button
        className="btn"
        onClick={() => {
          handleFetchProfile();
        }}
      >
        Fetch Profile
      </button>
      <br />
      <button
        className="btn"
        onClick={() => {
          handleFetchAccount();
        }}
      >
        Fetch Account
      </button>
      <div
        style={{ marginTop: "50px", display: "flex", flexDirection: "column" }}
      >
        <button
          className="btn"
          onClick={() => {
            handleEditProfile();
          }}
        >
          Edit Profile
        </button>
        {/* <input
          type="text"
          name="name"
          value={logUser.email}
          placeholder="name"
        /> */}
      </div>
    </div>
  );
};

export default AuthPage;
