import { Block0 } from "../../Components/Block0/Block0";
import { Block1 } from "../../Components/Block1/Block1";
import { Block3 } from "../../Components/Block3/Block3";
import { Contact } from "../../Components/Contact/Contact";
import { CounterBlock } from "../../Components/CounterBlock/CounterBlock";
import { Landing } from "../../Components/Landing/Landing";
import "./Homepage.css";
import {
  b3content,
  block1HomePageContent,
  block1HomePageContent2,
  block3HomePageContent1,
} from "../../Context/Content";

import { useContext, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";

export const Homepage = () => {
  const blockRef1 = useRef(null);
  const blockRef2 = useRef(null);
  const blockRef3 = useRef(null);
  const blockRef4 = useRef(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      {
        threshold: 0.2, // Trigger when the element is at least 10% visible
      }
    );

    // Observe the divs wrapping the Block1 components
    if (blockRef1.current) {
      observer.observe(blockRef1.current);
    }
    if (blockRef2.current) {
      observer.observe(blockRef2.current);
    }
    if (blockRef3.current) {
      observer.observe(blockRef3.current);
    }
    if (blockRef4.current) {
      observer.observe(blockRef4.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (blockRef1.current) {
        observer.unobserve(blockRef1.current);
      }
      if (blockRef2.current) {
        observer.unobserve(blockRef2.current);
      }
      if (blockRef3.current) {
        observer.unobserve(blockRef3.current);
      }
      if (blockRef4.current) {
        observer.unobserve(blockRef4.current);
      }
    };
  }, []);

  useEffect(() => {
    if (user && user !== null) {
      setTimeout(navigate("/home"), 3000);
      return;
    } else {
      setLoading(false);
    }
  }, [navigate, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Landing />
      <div ref={blockRef1} className="animated-block">
        <CounterBlock />
      </div>
      <div ref={blockRef2} className="animated-block">
        <Block0 />
      </div>{" "}
      <Block1 input={block1HomePageContent} />
      <div ref={blockRef4} data={b3content} className="animated-block">
        {" "}
        <Block3 data={block3HomePageContent1} />
      </div>
      <div ref={blockRef3} className="animated-block">
        <Block1 input={block1HomePageContent2} alt={2} />
      </div>
      <Contact />
    </div>
  );
};
