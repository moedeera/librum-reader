import { db } from "firebase-config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

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
const randomNumber = Math.floor(Math.random() * 1001);
const auth = getAuth();

const testUser = {
  email: "test-user",
  password: "abc123",
  name: "John Smith",
};

const fbProfile = collection(db, "profile");

const handleRegister = async () => {
  createUserWithEmailAndPassword(
    auth,
    `${names[number1]}${lastNames[number2][0]}-${randomNumber}@gmail.com`,
    testUser.password
  )
    .then(async () => {
      // Signed in

      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: `${names[number1]} ${lastNames[number2]}`,
        photoURL: "https://www.w3schools.com/howto/img_avatar.png",
      });
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
