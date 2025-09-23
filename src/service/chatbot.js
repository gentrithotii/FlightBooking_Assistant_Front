import axios, { Axios } from "axios";

const URL = "http://localhost:8080/api/chat/ask";

export const assistantConversation = async (userMessage) => {
  try {
    const response = await axios.get(URL, {
      params: { question: userMessage },
    });

    return response.data;
  } catch (error) {
    console.error("Could not answer");
    throw error;
  }
};
