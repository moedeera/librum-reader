import "./Contact.css";
import { useState } from "react";
import { useMessages } from "@/utils/custom-hooks/useMessages";
import { Loading } from "../Loading/Loading";

export const Contact = () => {
  const { createMessage } = useMessages();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      await createMessage(name, email, message);
      setLoading(false);
      alert("Message sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="contact-block">
          <h3>Have any Questions? Want to Collaborate? Send Us a Message</h3>
          <p>Name</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Email</p>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Message</p>
          <textarea
            rows={10}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Send
          </button>
        </div>
      )}
    </>
  );
};
