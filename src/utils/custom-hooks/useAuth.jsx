import { useContext, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db, signInWithGoogle } from "../../../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  checkProfileLimit,
  checkURLAvailability,
} from "../functions/functions";
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

  const profileCollection = collection(db, "profiles");
  const accountsCollection = collection(db, "accounts");
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

    const q = query(profileCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    setLoading(true);
    if (querySnapshot.empty) {
      console.log("no such profile, creating new profile.....");
      try {
        const finalUrl = await checkURLAvailability(user.displayName);
        let newProfile = {
          avatar: user.photoURL,
          bio: "Enter your Bio",
          email: user.email,
          name: user.displayName,
          stories: [],
          followers: [],
          public: true,
          url: finalUrl,
          userId: user.uid, // Reference to the user ID of the creator
          createdAt: new Date(), // Optional: track when the post was created
        };
        await addDoc(profileCollection, newProfile);
        const newUserAccount = await addDoc(accountsCollection, {
          email: userInfo.email,
          userId: user.uid,
          messages: [],
          drafts: [],
          genres: [],
          bookmarks: [],
        });
        console.log(
          "User profile and account created successfully",
          newProfile,
          newUserAccount
        );

        await setCurrentProfile(newProfile);
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
    //
    // Check if the URL property is already in use

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
        bio: "Enter your Bio",
        public: true,
        userId: user.uid,
        createdAt: new Date(),
      });
      const newUserAccount = await addDoc(accountsCollection, {
        email: user.email,
        userId: user.uid,
        messages: [],
        drafts: [],
        genres: [],
        bookmarks: [],
      });
      console.log(
        "User profile and account created successfully",
        createdProfile,
        newUserAccount
      );
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
