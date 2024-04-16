import { useContext, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
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

  const fbProfile = collection(db, "profile");
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
  // login with google
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
        await addDoc(fbProfile, newProfile);
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

  return { handleLogin, signInWithGoogleFunction, loading, error, setError };
};
