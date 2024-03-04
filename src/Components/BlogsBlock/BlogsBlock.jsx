import client from "@/client";
import "./BlogsBlock.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
export const BlogsBlock = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    client
      .fetch(`*[_type == "post"]`)
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);
  console.log(posts);
  const projectId = "2d4fqbse";
  const dataset = "production";
  return (
    <div className="blogs-container">
      <div className="blogs-list">
        {posts.map((post) => (
          <div key={post._id} className="blog-item">
            <Link to={`../blogs/${post.slug.current}`}>
              <h1>{post.title}</h1>
            </Link>
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
