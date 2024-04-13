import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const AuthPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  return <div className="container">AuthPage</div>;
};

export default AuthPage;
