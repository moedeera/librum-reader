import { Contact } from "../../Components/Contact/Contact";
import "./ContactPage.css";

export const ContactPage = () => {
  return (
    <div className="container">
      <div className="contact-page">
        {" "}
        <h1>Contact Us</h1>
        <Contact />
      </div>
    </div>
  );
};
