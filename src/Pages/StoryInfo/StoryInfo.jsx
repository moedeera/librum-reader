import { useNavigate } from "react-router-dom";
import "./StoryInfo.css";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../Context/Context";

import { DropDown } from "../../Components/DropDown/DropDown";
import ImageBox from "./ImageUploader";
import { createStory, uploadImage } from "../../assets/APIs/StoriesAPI";
import { Loading } from "../../Components/Loading/Loading";

export const StoryInfo = () => {
  const navigate = useNavigate();
  const { story, setStory, user, storyImage } = useContext(SiteContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Cancel the event
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = "";
    };

    // Add event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [newStoryInfo, setNewStoryInfo] = useState({
    author: user.name,
    id: "",
    ref: "",
    title: "",
    summary: "",
    public: true,
    authorPic: user.pic,
    tags: [],
    category: "",
  });

  const onChangeHandler = (e, type) => {
    if (type === "title") {
      setNewStoryInfo({ ...newStoryInfo, title: e.target.value });
    } else if (type === "summary") {
      setNewStoryInfo({ ...newStoryInfo, summary: e.target.value });
    } else if (type === "tags") {
      setNewStoryInfo({
        ...newStoryInfo,
        tags: [...newStoryInfo.tags, e.target.value],
      });
    } else if (type === "category") {
      setNewStoryInfo({ ...newStoryInfo, category: e.target.value });
    }
  };

  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    // Split the input by commas or spaces and filter out any empty strings
    const newItems = input.split(/[\s,]+/).filter((item) => item.trim() !== "");
    setItems(newItems);
    setNewStoryInfo({ ...newStoryInfo, tags: [newItems] });
    // console.log(newItems);
  }, [input]);

  const handleContinue = async () => {
    setLoading(true);
    setError(""); // Reset previous errors

    try {
      const imageURL = await uploadImage(storyImage); // Ensure this returns a Promise
      if (!imageURL) {
        throw new Error("Failed to upload image");
      }
      const newStory = {
        picture: imageURL,
        title: newStoryInfo.title,
        author: user.name,
        authorPic: user.pic,
        summary: newStoryInfo.summary,
        tags: newStoryInfo.tags,
        comments: [],
        likes: 0,
        views: 0,
      };
      const newSavedStory = await createStory(newStory); // Assuming this also returns a Promise
      console.log(newSavedStory); // Success handling here, like navigation or setting state
    } catch (error) {
      setError(error.message); // Set error state to display the error message
    } finally {
      setLoading(false); // Always reset loading state, whether success or failure
    }
  };

  //   try {
  //     c
  //     // Assuming setStory is an async operation or you have a mechanism to ensure the story is saved/persisted before navigating.
  //
  //     const storyId = await createStory(newStory);
  //     setStory({ ...newStory, id: storyId });
  //     setSuccess(true);
  //   } catch (error) {
  //     // Enhance error handling by checking error type or message.
  // // Implement `displayError` for better UX.
  //     console.error(error); // For debugging purposes.
  //   } finally {
  //     setLoading(false);
  //   }
  if (user === null || !user) {
    navigate("/login");
    return;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="story-info-page">
        <h3>Story Info</h3>
        <div className="story-info-container">
          {/* <div className="story-info-picture">
            <button className="btn btn-primary">Add Image</button>
          </div> */}
          {/* <ImageUploader /> */}
          <ImageBox />
          <div className="story-info-details">
            {" "}
            <div className="story-info-input">
              <h4>Title</h4>
              <input
                name="title"
                type="text"
                value={newStoryInfo.title}
                onChange={(e) => {
                  onChangeHandler(e, "title");
                }}
              />
            </div>
            <div className="story-info-input">
              <h4>Description</h4>
              <textarea
                name="title"
                type="text"
                value={newStoryInfo.summary}
                onChange={(e) => {
                  onChangeHandler(e, "summary");
                }}
                id=""
                cols="30"
                rows="10"
              />
            </div>
            <div className="story-info-input">
              <h4>Tags</h4>
              <input type="text" value={input} onChange={handleInputChange} />

              <div className="story-info-tags">
                {" "}
                {items.map((item, index) => (
                  <small key={index}>{item}</small>
                ))}{" "}
              </div>
            </div>
            <div className="story-info-input">
              <DropDown
                selections={[
                  "Fiction",
                  "Sci-fi",
                  "Fantasy",
                  "Non-Fiction",
                  "Fan-Fiction",
                ]}
                setValue={setNewStoryInfo}
                storyInfo={newStoryInfo}
              />
            </div>
            <div className="story-page-button-container">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleContinue();
                }}
              >
                Continue
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setStory({
                    ...story,
                    id: "preview",
                    title: newStoryInfo.title,
                    author: user.name,
                    authorPic: user.pic,
                    summary: newStoryInfo.summary,
                    tags: newStoryInfo.tags,
                    comments: [],
                    likes: 0,
                    views: 0,
                  });
                  console.log(story);
                }}
              >
                Preview & Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
