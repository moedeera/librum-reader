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
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      setFeedback("All fields are required.");
      setIsError(true);
      return;
    }
    setLoading(true);
    setFeedback("");
    setIsError(false);
    try {
      await createMessage(name, email, message);
      setLoading(false);
      setFeedback("Message sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => {
        setFeedback("");
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFeedback("Failed to send message. Please try again later.");
      setIsError(true);
      setLoading(false);
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
          {feedback && (
            <p className={`feedback-message ${isError ? "error" : "success"}`}>
              {feedback}
            </p>
          )}
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
