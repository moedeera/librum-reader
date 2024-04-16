import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";

export const CreateStory = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container standard-page">
      <h3>Create Story</h3>
    </div>
  );
};
