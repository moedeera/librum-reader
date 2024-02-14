import { useState } from "react";
import "./SearchPage.css";
import { Loading } from "../../Components/Loading/Loading";

export const SearchPage = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  }

  return <div className="container"></div>;
};
