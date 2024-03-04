import "./BlogsBlock.css";

function trimParagraphTo25Words(paragraph) {
  // Split the paragraph into words
  const words = paragraph.split(/\s+/);

  // Check if the paragraph is already 25 words or shorter
  if (words.length <= 25) {
    return paragraph;
  } else {
    // Join the first 25 words and add "..."
    return words.slice(0, 20).join(" ") + "...";
  }
}

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const BlogsBlock = ({ posts, function1, function2 }) => {
  console.log(posts[0]);
  return (
    <div className="blogs-container">
      <div className="blogs-list">
        {posts?.map((post) => (
          <div key={post._id} className="blog-item">
            <div className="blog-item-details">
              {" "}
              <Link to={`../blogs/${post.slug.current}`}>
                <h4>{post.title}</h4>
              </Link>
              <small> By Admin </small>
              <small> {post._createdAt.slice(0, 10)}</small>
            </div>

            <Link
              to={`../blogs/${post.slug.current}`}
              className="blog-item-image"
              style={{
                backgroundImage: `url(${function1(post.mainImage.asset._ref)})`,
              }}
            ></Link>

            <br />
            {`${trimParagraphTo25Words(post?.body[0].children[0].text)}`}
            <small className="btn">
              <Link>Read More</Link>
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};
