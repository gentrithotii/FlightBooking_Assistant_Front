import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { assistantConversation } from "../service/chatbotService";

const Chatbot = ({ fetchFlights }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setLoading(true);

    try {
      const aiMessage = await assistantConversation(userMessage.text);

      console.log(aiMessage);

      const botReply = {
        sender: "bot",
        text: aiMessage,
      };

      setMessages((prev) => [...prev, botReply]);

      await fetchFlights();
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex flex-column border rounded shadow-sm mx-auto mt-4"
      style={{ maxWidth: "800px", height: "700px" }}
    >
      <div className="flex-grow-1 overflow-auto p-3 bg-light">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex mb-2 ${
              msg.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded ${
                msg.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-secondary text-white"
              }`}
              style={{ maxWidth: "75%" }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border-top d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Ask about flights..."
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="btn btn-primary"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Loading...</span>
            </>
          ) : (
            <i className="bi bi-send"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
