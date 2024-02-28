import { Link, useNavigate } from "react-router-dom";
import "./StoryInfo.css";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../Context/Context";

import { DropDown } from "../../Components/DropDown/DropDown";
import ImageBox from "./ImageUploader";
import { saveStory, uploadImage } from "../../assets/APIs/StoriesAPI";
import { Loading } from "../../Components/Loading/Loading";

export const StoryInfo = () => {
  const navigate = useNavigate();
  const { story, setStory, user, storyImage } = useContext(SiteContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageLink, setImageLink] = useState("undefined");
  const [storyLink, setStoryLink] = useState("no link");

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
  useEffect(() => {
    let timer;
    if (loading) {
      // Set loading back to false after 3 seconds
      timer = setTimeout(() => {
        setLoading(false);
      }, 20000);
    }
    // Cleanup function to clear the timeout if loading changes to false before 3s
    return () => clearTimeout(timer);
  }, [loading]);
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
    setNewStoryInfo({ ...newStoryInfo, tags: [...newItems, "general"] });
    // console.log(newItems);
  }, [input]);

  const handleContinue = async () => {
    if (error) {
      return;
    }

    setError("");
    if (newStoryInfo.title === "") {
      setError("Please enter a title");
      return;
    }
    if (newStoryInfo.summary === "") {
      setError("Please enter a summary");
      return;
    }

    if (newStoryInfo.tags.length === 0) {
      setError("Please enter at least one tag");
      return;
    }
    setLoading(true);

    let imageURL;
    try {
      imageURL = await uploadImage(storyImage);
      if (imageURL && imageURL !== undefined) {
        setImageLink(imageURL);
        setSuccess(true);
        const updatedStoryInfo = {
          ...newStoryInfo,
          author: user.name,
          authorPic: user.pic,
          comments: [],
          likes: 0,
          views: 0,
          story: [],
          picture: imageURL,
        };

        console.log(updatedStoryInfo);
        // Set the updated state
        setNewStoryInfo(updatedStoryInfo);

        // Use the updated object directly
        let id = await saveStory(updatedStoryInfo);
        if (id) {
          setStoryLink(id);
          setError(false);
        } else {
          setError("Unable to save story");
          throw new Error("unable to save story");
        }
      }
    } catch (error) {
      setError("Unable to Save Story");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  if (user === null || !user) {
    navigate("/login");
    return;
  }

  if (loading) {
    return <Loading />;
  }

  if (success && !loading && !error) {
    return (
      <div className="container">
        <div
          className="story-info-page"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            border: "1px solid rgba(128,128,128,0.5)",
            margin: "100px auto 0px",
            width: "50%",
            minWidth: "300px",
          }}
        >
          <h4>Story Successfully created !</h4>
          <p>
            Image link <Link to={{ imageLink }}>Here</Link>{" "}
          </p>
          <p>
            Here is the <Link to={`mystory/${storyLink}`}>Link</Link>{" "}
          </p>
          <p>
            Click <Link to={"/"}>this link</Link> to start editing{" "}
          </p>
        </div>
      </div>
    );
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
          <ImageBox setError={setError} />
          <div className="story-info-details">
            {error && <p style={{ color: "red" }}>{error}</p>}
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
