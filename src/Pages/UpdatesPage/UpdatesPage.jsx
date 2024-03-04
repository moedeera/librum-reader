import { BlogsBlock } from "@/Components/BlogsBlock/BlogsBlock";
import "./UpdatesPage.css";
import { useEffect, useState } from "react";
import client from "@/client";

function convertToSanityImageUrl(imageString) {
  // Extract the fileId, dimensions, and format from the input string
  const match = imageString.match(/^image-(.+)-(\d+)x(\d+)-(\w+)$/);
  if (!match) {
    console.error("Input string format is incorrect.");
    return null;
  }

  const [, fileId, width, height, format] = match;
  const projectId = "2d4fqbse";
  const dataset = "production";
  // Construct the Sanity CDN URL
  const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${fileId}-${width}x${height}.${format}`;
  return url;
}
export const UpdatesPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    client
      .fetch(`*[_type == "post"]`)
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);
  console.log(posts);

  return (
    <div className="container updates-page">
      <h3 className="updates-page-header">Latest News and Updates</h3>
      <BlogsBlock posts={posts} function1={convertToSanityImageUrl} />
    </div>
  );
};
