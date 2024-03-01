import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase-config";
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
//saved story
//published  story
const storyData = collection(db, "stories");
// summary of story
const storySummaries = collection(db, "summaries");

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    if (!image) {
      console.log("error with image");
      reject("No image provided");
      return;
    }
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            console.log(url);
            console.log("successfully uploaded image");
            resolve(url); // Resolve the promise with the URL
          })
          .catch((error) => {
            console.log(error);
            reject(error); // Reject the promise if there's an error getting the download URL
          });
      })
      .catch((error) => {
        console.log(error);
        reject(error); // Reject the promise if there's an error uploading the file
      });
  });
};
// profile fetching function
const fetchProfile = async (name) => {
  // Reset profile data

  // Create a query against the collection.
  const q = query(collection(db, "profile"), where("name", "==", name));

  const querySnapshot = await getDocs(q);
  const profiles = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    profiles.push(doc.data());
  });

  // Assuming you want the first document that matches
  if (profiles.length > 0) {
    console.log(profiles[0]);
    let data = profiles[0];
    return data;
  } else {
    console.log("error");
    throw new Error("no user found");
  }
};
//update story function
async function updateStoriesWithSlug() {
  const wasItSet = localStorage.getItem("summary-slugs-created-2");
  if (wasItSet) {
    return;
  }

  try {
    // Reference to the stories collection
    const storiesRef = collection(db, "summaries");

    // Get a snapshot of the stories collection
    const snapshot = await getDocs(storiesRef);

    // Update each document in the collection
    const updatePromises = snapshot.docs.map(async (document) => {
      console.log(document.data());
      // Construct the slug using the document id and the link attribute
      const slug = `${document.id}-${document.data().link}`;
      const storyDoc = doc(db, "summaries", document.id);
      // Update the document with the new slug attribute
      // await storiesRef.doc(doc.id).update({ slug: slug });
      await updateDoc(storyDoc, { slug: slug });
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);
    localStorage.setItem("summary-slugs-created-2", true);
    console.log("All stories have been updated with slugs.");
  } catch (error) {
    console.error("Error updating stories with slugs:", error);
  }
}
const fetchStory = async (idOrSlug) => {
  let matchedStories = [];
  try {
    // Reference to the stories collection
    const storiesRef = collection(db, "stories");

    // Query the stories collection for the first document with the specified slug
    const q = query(
      storiesRef,
      where("slug", "==", "3Zktmck8E77mUpxzVmRK-art-innovation")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching slugs.");
      const storyDoc = doc(db, "stories", idOrSlug);
      const docSnapshot = await getDoc(storyDoc);

      if (docSnapshot.exists()) {
        const summaryData = docSnapshot.data();
        return summaryData;
      }

      return null;
    } else {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        matchedStories.push(doc.data());
      });
    }

    // Return the first document found
    console.log(matchedStories[0]);
    return matchedStories[0];
  } catch (error) {
    console.error("Error searching story by slug:", error);
    return null; // or handle the error as appropriate for your application
  }
};
const fetchStoryBySlugOrId = async (slugOrId) => {
  try {
    // Reference to the stories collection
    const storiesRef = collection(db, "stories");

    // First, attempt to fetch the document assuming slugOrId is an ID
    const docRef = doc(storiesRef, slugOrId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document found with the provided ID, return this document
      console.log("Document found with ID:", slugOrId);
      return docSnap.data();
    } else {
      // No document found with the ID, proceed to assume slugOrId is a slug
      console.log("No document found with ID. Trying as slug...");

      // Query the stories collection for the document with the specified slug
      const q = query(storiesRef, where("slug", "==", slugOrId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents with slug.");
        return null;
      } else {
        // Assuming slug is unique and you want only the first matching document
        const firstDoc = querySnapshot.docs[0];
        console.log("Document found with slug:", slugOrId);
        return firstDoc.data();
      }
    }
  } catch (error) {
    console.error("Error searching story by slugOrId:", error);
    return null; // or handle the error as appropriate for your application
  }
};
//Save Story
const saveStory = async (story) => {
  try {
    const docRef = await addDoc(storyData, {
      author: story.author,
      authorPic: story.authorPic,
      title: story.title,
      summary: story.summary,
      public: false,
      picture: story.picture,
      tags: [story.tags[0], "all"],
      category: story.category,
      comments: [],
      likes: 0,
      views: 0,
      ref: "",
      story: story.story,
      date: new Date(),
    });
    const titleToLink = (title) => {
      return title.trim().replace(/\s+/g, "-");
    };

    const link = titleToLink(story.title);

    await updateDoc(docRef, {
      id: docRef.id,
      link: link,
      slug: `${docRef.id}-${link}`,
    });
    const iD = docRef.id;
    await addDoc(storySummaries, {
      id: story.id,
      ref: iD,
      cat: story.category,
      title: story.title,
      info: story.summary,
      tag: story.tags[0],
      pic: story.picture,
      author: story.author,
    });

    console.log("success, story and summary was saved on data-base");
    return iD;
  } catch (error) {
    console.log(error);
  }
};

//Update Story
const updateStory = async (documentId, newStoryArray) => {
  const storyDocRef = doc(db, "stories", documentId);

  try {
    await updateDoc(storyDocRef, {
      story: newStoryArray,
    });
    return "successfully updated story";
  } catch (error) {
    console.error("Error updating document: ", error);
    return "unable to update story";
  }
};
// UpdateStory status
const updateStoryStatus = async (id, status) => {
  const storyDocRef = doc(db, "stories", id);

  try {
    await updateDoc(storyDocRef, {
      public: status,
    });
    return "successfully updated story";
  } catch (error) {
    console.error("Error updating document: ", error);
    return "unable to update story";
  }
};
const updateSummaryStatus = async (id, status) => {
  const summariesDocRef = doc(db, "summaries", id);
  const q = query(summariesDocRef, where("ref", "==", id));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No summary found.");
    throw new Error("No summary found");
  } else {
    // Assuming slug is unique and you want only the first matching document
    const firstDoc = querySnapshot.docs[0];

    try {
      await updateDoc(firstDoc, {
        public: status,
      });
      return "successfully updated story";
    } catch (error) {
      console.error("Error updating document: ", error);
      return "unable to update story";
    }
  }
};
// Publish story
const createStory = async (story, image) => {
  console.log(image);
  try {
    const docRef = await addDoc(storyData, {
      author: story.author,
      authorPic: story.authorPic,
      title: story.title,
      summary: story.summary,
      public: true,
      picture: image,
      tags: story.tags[0],
      category: story.category,
      comments: [],
      likes: 0,
      views: 0,
      ref: "",
      story: story.Array,
      date: new Date(),
    });
    const titleToLink = (title) => {
      return title.trim().replace(/\s+/g, "-");
    };

    const link = titleToLink(story.title);

    await updateDoc(docRef, {
      id: docRef.id,
      link: link,
      slug: `${docRef.id}-${link}`,
    });
    const iD = docRef.id;
    await addDoc(storySummaries, {
      id: story.id,
      ref: iD,
      cat: story.category,
      title: story.title,
      info: story.summary,
      tag: story.tags[0],
      pic: story.picture,
      author: story.author,
      public: false,
    });

    console.log("success, story and summary was saved on data-base");
    return iD;
  } catch (error) {
    console.log(error);
  }
};

const publishStory = async (id, storyData) => {
  const storyRef = doc(db, "stories", id);

  try {
    await updateDoc(storyRef, {
      story: storyData,
      public: true,
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export {
  updateStoriesWithSlug,
  fetchStory,
  fetchStoryBySlugOrId,
  fetchProfile,
  uploadImage,
  createStory,
  saveStory,
  publishStory,
  updateStory,
  updateStoryStatus,
};
