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
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

const AuthPage = () => {
  const { signInWithGoogleFunction } = useContext(SiteContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [testUser, setTestUser] = useState({
    email: "test-user",
    password: "abc123",
    name: "John Smith",
  });
  const [randomNumber, setRandomNumber] = useState(58);
  const auth = getAuth();
  const fbProfile = collection(db, "profile");
  // login with email and password
  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, "testing@gmail.com", "abc123")
      .then(async (userCredential) => {
        // Signed in
        // localStorage.setItem("librum-user", JSON.stringify(userInfo));
        console.log(userCredential.user);
        setCurrentUser(userCredential.user);
      })
      .catch((error) => {
        console.log("error code:", error.code, "error message:", error.message);
      });
  };
  // login with google
  const handleLoginWithGoogle = async () => {
    signInWithGoogleFunction();
  };
  //Fetching Profile
  const handleFetchProfile = async () => {
    console.log(auth.currentUser.email);

    const profileRef = collection(db, "profile");
    const q = query(profileRef, where("email", "==", auth.currentUser.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("no such profile");
    } else {
      let data = querySnapshot.docs[0].data();
      console.log(data, querySnapshot.docs[0].id);
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

    createUserWithEmailAndPassword(
      auth,
      `${names[number1]}${lastNames[number2][0]}-${randomNumber}@gmail.com`,
      testUser.password
    )
      .then(async () => {
        // Signed in

        const user = auth.currentUser;
        const createdProfile = await addDoc(fbProfile, {
          email: user.email,
          name: `${names[number1]} ${lastNames[number2]}`,
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          stories: [],
          messages: [],
          gender: null,
          dob: null,
          bio: "Enter your Bio",
          public: false,
          userId: user.uid, // Reference to the user ID of the creator
          createdAt: new Date(), // Optional: track when the post was created
        });

        console.log("success", createdProfile);

        // ...
      })
      .catch((error) => {
        console.log(error);

        // ..
      });
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
  // Creating a story
  const handleCreateStory = async () => {};
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
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
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
      <button
        className="btn"
        onClick={() => {
          handleFetchProfile();
        }}
      >
        Fetch Profile
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
