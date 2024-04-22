
import { db } from "../../../firebase-config";


import {
  addDoc,
  collection,
 
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext,useState } from "react";

import { useDraft } from "@/utils/custom-hooks/useDraft";
import { AuthContext } from "@/Context/AuthContext";

import { loremIpsum } from "@/Context/Content";
import { appendStringWithDateTime } from "@/utils/functions/functions";
import { handleFetchProfile } from "./Functions";


const AuthPage = () => {

  const { user } = useContext(AuthContext);

  const { createDraft } = useDraft();

  const [loading, setLoading] = useState(true);


  const draftsCollection = collection(db, "drafts");

const handleCreateDraft = async () => {
  let account;
  console.log(user);
  const accountCollection = collection(db, "accounts");
  try {
    const q = query(accountCollection, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    setLoading(true);
    if (querySnapshot.empty) {
      throw new Error("No such profile");
    } else {
      account = querySnapshot.docs[0];
      console.log(account.data());
    }

    const profile = await handleFetchProfile();
    console.log(profile);
    let initialSLug = `alpinelife`;

    const finalSlug = appendStringWithDateTime(initialSLug, profile.url);
    let newDraft = {
      authorName: user.displayName,
      userId: user.uid,
      authorPic: user.photoURL,
      category: "Fiction",
      authorLink: profile.url,
      dateCreated: new Date(),
      title: "Alpine Life",
      synopsis:
        "A lovely town by the Alpine river encounters a mysterious wizard warning them of impending war",
      cover:
        "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2Flittle-girl-running-795505_1280.jpg?alt=media&token=c5ba4877-7d6d-40e0-a7c2-c2108c09e5db",
      slug: finalSlug,
      story: loremIpsum,
      promoted: false,
      wordCount: "",
      stats: [0, 0, 0],
    };

    const createdDraft = await addDoc(draftsCollection, newDraft);
    const draftId = await createdDraft.id;
    console.log(draftId);
    let updatedDrafts = [
      ...account.data().drafts,
      {
        draftId: draftId,
        slug: finalSlug,
        title: "A lovely town",
        cover:
          "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2Flittle-girl-running-795505_1280.jpg?alt=media&token=c5ba4877-7d6d-40e0-a7c2-c2108c09e5db",
      },
    ];
    await updateDoc(account.ref, { drafts: updatedDrafts });
    console.log(createdDraft);
  } catch (error) {
    console.log(error);
  }
}...