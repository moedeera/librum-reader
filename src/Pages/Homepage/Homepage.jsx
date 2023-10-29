import { Block1 } from "../../Components/Block1/Block1";
import { CounterBlock } from "../../Components/CounterBlock/CounterBlock";
import { Landing } from "../../Components/Landing/Landing";
import "./Homepage.css";

export const Homepage = () => {
  return (
    <div className="container">
      <Landing />
      <Block1 />
      <CounterBlock />
    </div>
  );
};
