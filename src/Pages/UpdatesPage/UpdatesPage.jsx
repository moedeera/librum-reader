import { BlogsBlock } from "@/Components/BlogsBlock/BlogsBlock";
import "./UpdatesPage.css";

export const UpdatesPage = () => {
  return (
    <div className="container updates-page">
      <h3 className="updates-page-header">Latest</h3>
      <BlogsBlock />
    </div>
  );
};
