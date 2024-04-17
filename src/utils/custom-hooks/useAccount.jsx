import { useContext, useEffect, useState, useCallback } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const useAccount = () => {
  const { user } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const accountsCollection = collection(db, "accounts");

  const auth = getAuth();

  const fetchAccount = useCallback(async () => {
    if (!user || !auth.currentUser || user === null) {
      setError("No user logged in.");
      return;
    }
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
        const newUserAccount = await addDoc(accountsCollection, {
          userId: user.uid,
          messages: [],
          drafts: [],
          genres: [],
          bookmarks: [],
        });
        setAccount(newUserAccount);
      } else {
        let data = querySnapshot.docs[0].data();
        setAccount(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, [user, isFetching, accountsCollection, auth.currentUser]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return {
    account,
    isFetching,
    error,
  };
};
