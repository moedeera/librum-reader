import { Block0 } from "../../Components/Block0/Block0";
import { Block1 } from "../../Components/Block1/Block1";
import { Block3 } from "../../Components/Block3/Block3";
import { Contact } from "../../Components/Contact/Contact";
import { CounterBlock } from "../../Components/CounterBlock/CounterBlock";
import { Landing } from "../../Components/Landing/Landing";
import "./Homepage.css";
import { b3content } from "../../Context/Content";
import { Block6 } from "../../Components/Block6/Block6";
import { useContext, useEffect } from "react";
import { SiteContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const { user } = useContext(SiteContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user !== null) {
      navigate("/home");
      return;
    }
  }, [navigate, user]);

  return (
    <div className="container">
      <Landing />
      <CounterBlock />
      <Block6 />
      <Block0 />
      <Block1 />
      <Block3 data={b3content} />
      <Contact />
    </div>
  );
};
