import "quill/dist/quill.snow.css";
import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "./StoryPage.css";
import { SiteContext } from "../../Context/Context";
import { loremIpsum, storiesInfo } from "../../Context/Content";
import { db } from "../../../firebase-config";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { findImageSet, imagesSorted } from "../../assets/images/images";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { Loading } from "../../Components/Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const StoryPage = () => {
  const [postData, setPostData] = useState("");
  const { storyId, story } = useContext(SiteContext);
  let info = { title: "Legend of the Lurkers" };
  const storyData = collection(db, "stories");
  const storySummaries = collection(db, "summaries");
  const [storyFirebase, setStoryFirebase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  const { storyidorslug } = useParams();
  const navigate = useNavigate();
  const fetchStoryBySlugOrId = async (slugOrId) => {
    try {
      // Reference to the stories collection
      const storiesRef = collection(db, "stories");

      // First, attempt to fetch the document assuming slugOrId is an ID
      const docRef = doc(storiesRef, slugOrId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Document found with the provided ID, return this document
        console.log(
          "Document found with ID:",
          slugOrId,
          "slug is",
          docSnap.data().slug
        );
        navigate(`../story/${docSnap.data().slug}`);
        return docSnap.data();
      } else {
        // No document found with the ID, proceed to assume slugOrId is a slug
        console.log("No document found with ID. Trying as slug...");

        // Query the stories collection for the document with the specified slug
        const q = query(storiesRef, where("slug", "==", slugOrId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No matching documents with slug.");
          setStoryFirebase("error");
          navigate("/story-not-found");
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
  useEffect(() => {
    fetchStoryBySlugOrId(storyidorslug)
      .then((match) => {
        setValue(match); // This will log the actual document data or null

        console.log(match, value);

        setStoryFirebase(match);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch story:", error);
      });
  }, []);

  useEffect(() => {
    if (story) {
      info.title = story;
      // console.log(story);
    }
  }, [story]);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper === null) return;

      // Create a new Quill editor
      const editor = document.createElement("div");
      editor.setAttribute("id", "quill-editor");
      wrapper.append(editor);

      // Initialize Quill on the editor
      const quill = new Quill(editor, {
        theme: "snow",
        readOnly: true,
        modules: {
          toolbar: false, // Disable the toolbar
        },
      });

      // }
      console.log(storyFirebase);
      quill.setContents(storyFirebase.story);
      // fetchAndSetStory();
      // Log new characters when the user edits the content
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          // This logs the changes made by the user
          const content = quill.root.innerHTML;
          setPostData(content);
        }
      });
    },
    [storyFirebase]
  );
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="story-page">
        <div className="story-header-container">
          {" "}
          <small className="story-category-small">Fiction</small>
          <h3 className="story-page-header">{storyFirebase.title}</h3>
          <small>by {storyFirebase.author}</small>
        </div>

        <div className="story-container">
          <div className="story-stats">
            <div className="story-user">
              <div
                style={{
                  backgroundImage: `url("${
                    findImageSet("fantasy", imagesSorted)[1]
                  }")`,
                }}
                className="story-user-image"
              ></div>
              <p> {storyFirebase.author} </p>
            </div>
            <div className="story-stats-container">
              <div className="single-story-stat">
                {storyFirebase.views}{" "}
                <img src={findImageSet("icons", imagesSorted)[0]} alt="" />
              </div>
              <div className="single-story-stat">
                {storyFirebase.likes}{" "}
                <img src={findImageSet("icons", imagesSorted)[1]} alt="" />
              </div>
              <div className="single-story-stat">
                {storyFirebase.comments.length}{" "}
                <img src={findImageSet("icons", imagesSorted)[2]} alt="" />
              </div>
            </div>
          </div>

          <div
            className="story-page"
            ref={wrapperRef}
            id="quill-container"
          ></div>
          <div className="story-side-info">
            <div className="story-info-summary">
              {/* <p>Synopsis:</p>
              <small>
                Astronomers recount their experiences in deciphering signals
                from distant galaxies. These cosmic messages, once decoded,
                reveal the voices of civilizations far beyond our own, sparking
                reflections on the vastness of the universe....
              </small> */}
              <p>Tags:</p>
              {storyFirebase.tags.map((tag, index) => (
                <Link key={index} to={`../stories/${tag}`}>
                  {tag}
                  {index < storyFirebase.tags.length - 1 && ", "}
                </Link>
              ))}
              <br />
              <p>670 words</p>
              <small>Last Edited : November 23 2023</small>
            </div>
            <div className="story-info-summary">
              <p>Similiar stories:</p>
              <div className="similar-stories-container">
                <div className="similar-story">
                  <div className="ss-image"></div>
                  <div className="ss-story-title"></div>
                  <div className="ss-story-author"></div>
                </div>
              </div>
            </div>

            <div className="test-block-lower"></div>
          </div>
        </div>

        <div className="story-button-container">
          {/* <button id="edit-button" className="btn btn-primary btn-green">
            Edit
          </button> */}
        </div>
      </div>
    </div>
  );
};
