import { useContext, useState } from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { AuthContext } from "@/Context/AuthContext";

export const useMessages = () => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to create a new message
  const createMessage = async (name, email, message) => {
    try {
      const messagesRef = collection(db, "messages");
      const newMessage = {
        name,
        email,
        message,
        timestamp: Date.now(),
      };
      await addDoc(messagesRef, newMessage);
      console.log("Message sent successfully.");
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  };

  // Function to fetch messages for admin user only
  const fetchMessagesForAdmin = async () => {
    setLoading(true);
    try {
      const adminUserId = "vHbYS7VrHDMR4JldgnHnXzp1KYT2";
      const messagesRef = collection(db, "messages");
      const q = query(
        messagesRef,
        where("userId", "==", adminUserId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
      return fetchedMessages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    createMessage,
    fetchMessagesForAdmin,
  };
};
