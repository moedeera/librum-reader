import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";
import { Editor } from "@/Components/Editor/Editor";
import { StoryInfoForm } from "@/Components/StoryInfo/StoryInfoForm";

window.onbeforeunload = function () {
  alert("Data will be lost if you leave the page, are you sure?");
};

export const CreateStory = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState("");
  const [basics, setBasics] = useState(false);

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
        <StoryInfoForm
          storyInfo={storyInfo}
          setStoryInfo={setStoryInfo}
          setBasics={setBasics}
        />
      </div>
    );
  }

  return (
    <div className="container " style={{ paddingLeft: "10px" }}>
      <Editor title={data} story={story} setStory={setStory} />

      <button
        className="btn btn-primary"
        onClick={() => {
          setStoryInfo({
            ...storyInfo,
            id: "preview",
            title: storyInfo.title,
            author: user.displayName,
            authorPic: user.photoURL,
            authorLink: "",
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
