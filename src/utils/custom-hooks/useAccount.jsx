import { useContext, useEffect, useState, useCallback } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const useAccount = () => {
  const { user } = useContext(AuthContext);

  const accountsCollection = collection(db, "accounts");
  const auth = getAuth();

  const createAccount = async () => {
    if (!user || !auth.currentUser) {
      console.log("no user");
      return;
    }

    try {
      const q = query(
        accountsCollection,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        throw new Error("account already exists");
      }
      const newUserAccount = await addDoc(accountsCollection, {
        userId: user.uid,
        messages: [],
        drafts: [],
        genres: [],
        bookmarks: [],
      });
      return newUserAccount;
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchAccount = async () => {
    console.log(auth.currentUser);

    if (!user || user === null) {
      console.log("no user");
      return;
    }

    try {
      const q = query(
        accountsCollection,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error("No such account exists");
      } else {
        let data = querySnapshot.docs[0].data();
        return data;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    createAccount,
    fetchAccount,
  };
};
