import { db } from "firebase-config";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
const auth = getAuth();
//Fetching Profile
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
  let newName = `${profile.name} 2`;
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

export {
  handleFetchAccount,
  handleFetchProfile,
  handleUpdateAccount,
  handleUpdateProfile,
};
