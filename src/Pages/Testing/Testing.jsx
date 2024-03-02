import "./Testing.css";
import client from "../../client";
import { useEffect, useState } from "react";

export const Testing = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    client
      .fetch(`*[_type == "post"]`)
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);
  console.log(posts[0]?.mainImage.asset._ref);
  function convertToSanityImageUrl(imageString, projectId, dataset) {
    // Extract the fileId, dimensions, and format from the input string
    const match = imageString.match(/^image-(.+)-(\d+)x(\d+)-(\w+)$/);
    if (!match) {
      console.error("Input string format is incorrect.");
      return null;
    }

    const [, fileId, width, height, format] = match;

    // Construct the Sanity CDN URL
    const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${fileId}-${width}x${height}.${format}`;
    return url;
  }

  // Example usage
  const imageString =
    "image-1c7e20af7169ee667cb496829aa4b8d28666247d-1280x732-png";
  const projectId = "2d4fqbse"; // Replace with your actual project ID
  const dataset = "production"; // Replace with your actual dataset name

  return (
    <div className="container">
      {/* <div className="testing-page">
        <div className="login-section">
          <div className="login-test">
            <h3>John Smith</h3>{" "}
            <button className="btn btn-primary">
              Login with email & password
            </button>
            <button className="btn btn-primary">Login with Google</button>
          </div>
        </div>

        <div className="account-section">
          <div className="user-account">
            <h3>Account</h3>{" "}
            <div className="account-data-section">
              <div className="account-data">Name:John Smith</div>
              <div className="account-data">Bio:London, 28 Author</div>
              <div className="account-data">status:Public</div>

              <button className="btn btn-primary">Fetch</button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="user-profile">
            <h3>Profile</h3>{" "}
            <div className="profile-stories">
              <div className="story-data">
                <p>Story 1</p>
              </div>
              <div className="story-data">
                <p>Story 2 </p>
              </div>

              <button className="btn btn-primary">Fetch</button>
            </div>
          </div>
        </div>

        <div className="story-section">
          <div className="user-profile">
            <h3>Story</h3>{" "}
            <div className="profile-stories">
              <div className="story-data">
                <p>Story 1</p>
                <small>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </small>
              </div>

              <button className="btn btn-primary">Fetch</button>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <img
              src={`${convertToSanityImageUrl(
                post.mainImage.asset._ref,
                projectId,
                dataset
              )}`}
              alt=""
              style={{ width: "100%", maxWidth: "500px" }}
            />
            <br />
            {`${post.body[0].children[0].text}`}
          </div>
        ))}
      </div>
    </div>
  );
};
//image-1c7e20af7169ee667cb496829aa4b8d28666247d-1280x732-png
