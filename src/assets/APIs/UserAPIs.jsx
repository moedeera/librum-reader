import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, db, signInWithGoogle } from "../../../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const fbProfile = collection(db, "profile");
const auth = getAuth(app);

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

const loginWithEmailAndPassword = async (
  userInfo,
  redirection,
  link,
  errorHandler,
  setUser,
  setProfileInfo
) => {
  console.log("on log called", "user info:", userInfo.email, userInfo.password);

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
      if (
        error.message === "Firebase: Error (auth/invalid-login-credentials)."
      ) {
        errorHandler("Invalid login Credentials");
      } else {
        errorHandler(error.message);
      }
    });
};

const signInWithGoogleFunction = async (setProfileInfo, setUser) => {
  const userInfo = await signInWithGoogle();
  console.log(userInfo);
  const profileRef = collection(db, "profile");
  const q = query(profileRef, where("email", "==", userInfo.email));
  const querySnapshot = await getDocs(q);

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
      };
      await addDoc(fbProfile, newProfile);
      setProfileInfo(newProfile);
    } catch (error) {
      console.log(error);
    }

    console.log("success");
  } else {
    let data = querySnapshot.docs[0].data();
    setProfileInfo(data);
    localStorage.setItem("librum-profile", JSON.stringify(data));
  }

  localStorage.setItem("librum-user", JSON.stringify(userInfo));
  setUser(userInfo);
};
