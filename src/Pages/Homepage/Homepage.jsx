import { CounterBlock } from "../../Components/CounterBlock/CounterBlock";
import { Landing } from "../../Components/Landing/Landing";
import "./Homepage.css";

export const Homepage = () => {
  return (
    <div className="container">
      <Landing />
      <CounterBlock />
    </div>
  );
};
