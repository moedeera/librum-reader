import { useContext, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db, signInWithGoogle } from "../../../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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

export const useAuth = () => {
  const { setCurrentUser, setCurrentProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileCollection = collection(db, "profile");
  const auth = getAuth();

  // login with email and password
  const handleLogin = async (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
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
            setError(error);
          } finally {
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        console.log("error code:", error.code, "error message:", error.message);
      });
  };
  // login/register with google
  const signInWithGoogleFunction = async () => {
    const userInfo = await signInWithGoogle();
    console.log(userInfo);
    const user = auth.currentUser;
    const profileRef = collection(db, "profile");
    const q = query(profileRef, where("email", "==", userInfo.email));
    const querySnapshot = await getDocs(q);
    setLoading(true);
    if (querySnapshot.empty) {
      console.log("no such profile, creating new profile.....");
      try {
        let newProfile = {
          avatar: userInfo.pic,
          bio: "Enter your Bio",
          age: null,
          email: userInfo.email,
          name: userInfo.name,
          profileName: userInfo.name,
          stories: [],
          messages: [],
          gender: null,
          dob: null,
          intro: false,
          public: true,
          userId: user.uid, // Reference to the user ID of the creator
          createdAt: new Date(), // Optional: track when the post was created
        };
        await addDoc(profileCollection, newProfile);
        setCurrentProfile(newProfile);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }

      console.log("success");
    } else {
      let data = querySnapshot.docs[0].data();
      setCurrentProfile(data);
    }
  };
  // register with email and password
  // User Registration/ Create new user profile
  const handleRegister = async (newUser) => {
    // Check if there are already 100 'profile' documents
    const checkProfileLimit = async () => {
      const profilesQuery = query(profileCollection);
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
      const urlQuery = query(profileCollection, where("url", "==", searchUrl));
      const urlSnapshot = await getDocs(urlQuery);
      if (urlSnapshot.docs.length > 0) {
        // URL is in use, modify it by appending a random number
        const randomNumber = Math.floor(Math.random() * 1001); // random number between 0 and 1000
        return `${searchUrl}${randomNumber}`;
      }
      return searchUrl;
    };

    const { email, password, name } = newUser;
    setLoading(true);
    try {
      const limitCheck = await checkProfileLimit();
      if (limitCheck.error) {
        alert(limitCheck.error);
        return;
      }

      const finalUrl = await checkURLAvailability(name);
      const newUserEmail = email;
      const newUserPassword = password; // Consider using a more secure method of generating/storing passwords.

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: "https://www.w3schools.com/howto/img_avatar.png",
      });

      // create and add profile document to Firestore
      const createdProfile = await addDoc(profileCollection, {
        email: user.email,
        name: name,
        url: finalUrl,
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        stories: [],
        messages: [],
        gender: null,
        dob: null,
        bio: "Enter your Bio",
        public: true,
        userId: user.uid,
        createdAt: new Date(),
      });
      console.log("User profile created successfully", createdProfile);
      return user;
    } catch (error) {
      console.error("Error in user registration or profile creation:", error);
      setError(error);
      throw new Error("Error in user registration or profile creation");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    signInWithGoogleFunction,
    loading,
    error,
    setError,
    handleRegister,
  };
};
