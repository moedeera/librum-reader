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
} from "../../Context/Content";

import { useContext, useEffect, useRef } from "react";
import { SiteContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const blockRef1 = useRef(null);
  const blockRef2 = useRef(null);
  const blockRef3 = useRef(null);
  const blockRef4 = useRef(null);

  const { user } = useContext(SiteContext);
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
      navigate("/home");
      return;
    }
  }, [navigate, user]);

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
      <div className="animated-block">
        {" "}
        <Block3 ref={blockRef4} data={b3content} />
      </div>
      <div ref={blockRef3} className="animated-block">
        <Block1 input={block1HomePageContent2} alt={2} />
      </div>
      <Contact />
    </div>
  );
};
