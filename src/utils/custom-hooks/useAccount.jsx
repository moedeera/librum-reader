import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const useAccount = () => {
  const { user } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);

  const accountsCollection = collection(db, "accounts");

  const auth = getAuth();

  // fetch account information
  const fetchAccount = async () => {
    if (isFetching) return; // Prevent multiple calls
    setIsFetching(true);
    console.log(user);

    try {
      const q = query(
        accountsCollection,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const account = await addDoc(accountsCollection, {
          userId: user.uid,
          messages: [],
          drafts: [],
          genres: [],
          bookmarks: [],
        });
        return account;
      } else {
        let data = querySnapshot.docs[0].data();
        return data;
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    fetchAccount,
  };
};
