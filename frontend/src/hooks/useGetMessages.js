import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        
        // Check if the response is okay
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await res.json();

        // Check if data is an array
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }

    // Optional cleanup logic (e.g., aborting fetch)
    // return () => { /* Cleanup logic if necessary */ };

  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
