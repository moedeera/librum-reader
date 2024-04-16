import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";
import { Editor } from "@/Components/Editor/Editor";
import ImageBox from "../StoryInfo/ImageUploader";
import { DropDown } from "@/Components/DropDown/DropDown";

export const CreateStory = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState("");
  const [basics, setBasics] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const onChangeHandler = (e, type) => {
    if (type === "title") {
      setStoryInfo({ ...storyInfo, title: e.target.value });
    } else if (type === "summary") {
      setStoryInfo({ ...storyInfo, summary: e.target.value });
    } else if (type === "tags") {
      setStoryInfo({
        ...storyInfo,
        tags: [...storyInfo.tags, e.target.value],
      });
    } else if (type === "category") {
      setStoryInfo({ ...storyInfo, category: e.target.value });
    }
  };

  const [storyInfo, setStoryInfo] = useState({
    author: "",
    authorPic: "",
    title: "",
    summary: "",
    category: "",
    comments: [],
    date: "",
    likes: 0,
    views: 0,
    link: "",
    picture: "",
    ref: "",
    story: "",
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    // Split the input by commas or spaces and filter out any empty strings
    const newItems = input.split(/[\s,]+/).filter((item) => item.trim() !== "");
    setItems(newItems);
    setStoryInfo({ ...storyInfo, tags: [...newItems, "general"] });
    // console.log(newItems);
  }, [input]);

  useEffect(() => {
    // Function to set loading to false
    const endLoading = () => setLoading(false);

    // If user is authenticated at any point, end loading immediately
    if (user) {
      endLoading();
      return;
    }

    // Set a timeout to change the loading state after 5 seconds
    const timer = setTimeout(endLoading, 5000);

    // Clear the timeout if the component unmounts or user is found
    return () => clearTimeout(timer);
  }, [user]); // React to changes in user state

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="container standard-page">
        <h3>You need to be logged in</h3>
      </div>
    );
  }
  const data = { title: "Story" };

  if (!basics) {
    return (
      <div className="container standard-page">
        <div className="story-info-page">
          <h3>Story Info</h3>
          <div className="story-info-container">
            <ImageBox setError={setError} />
            <div className="story-info-details">
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="story-info-input">
                <h4>Title</h4>
                <input
                  name="title"
                  type="text"
                  value={storyInfo.title}
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
                  value={storyInfo.summary}
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
                  setValue={setStoryInfo}
                  storyInfo={storyInfo}
                />
              </div>
              <div className="story-page-button-container">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setBasics(true);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container " style={{ paddingLeft: "10px" }}>
      <Editor title={data} story={story} setStory={setStory} />

      <button
        className="btn btn-primary"
        onClick={() => {
          setStory({
            ...story,
            id: "preview",
            title: storyInfo.title,
            author: user.name,
            authorPic: user.pic,
            summary: storyInfo.summary,
            tags: storyInfo.tags,
            comments: [],
            story: story,
            likes: 0,
            views: 0,
          });
          console.log(storyInfo);
        }}
      >
        Preview & Save
      </button>
    </div>
  );
};
