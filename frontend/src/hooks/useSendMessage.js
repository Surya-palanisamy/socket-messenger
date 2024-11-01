import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // Send the message to the server
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Use functional update to ensure the latest state
      setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error) {
      // Display the error using a toast notification
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
