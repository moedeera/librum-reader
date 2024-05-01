import { useContext, useEffect, useState, useCallback } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/Context/AuthContext";
import { db } from "../../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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
        stories: [],
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

  const updateAccount = async (userId, field, newValue) => {
    try {
      const q = query(accountsCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No such account exists");
      } else {
        // Use .ref to get the document reference from the query snapshot
        let accountRef = querySnapshot.docs[0].ref;

        const updateObject = {};
        updateObject[field] = newValue;
        await updateDoc(accountRef, updateObject);
        console.log(`Account ${userId} updated successfully.`);
      }
    } catch (error) {
      console.error("Error updating account: ", error);
      throw error; // Re-throw to allow further handling by the component
    }
  };

  const updateAccount2 = async (userId, updatedAccount) => {
    try {
      // Set loading to true at the start of the operation
      const accountRef = doc(accountsCollection, userId); // Create a reference to the draft document
      const accountDoc = await getDoc(accountRef); // Get the document snapshot

      if (!accountDoc.exists()) {
        throw new Error("No such draft exists");
      } else {
        await updateDoc(accountRef, updatedAccount); // Pass the updates object directly
        console.log(`account for user ${userId} updated successfully.`);
      }
    } catch (error) {
      // Update error state with the error message
      throw error("Error updating draft:", error); // Re-throw the error for further handling
    }
  };

  return {
    createAccount,
    fetchAccount,
    updateAccount,
    updateAccount2,
  };
};
