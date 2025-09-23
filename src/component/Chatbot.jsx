import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { assistantConversation } from "../service/chatbot";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiMessage = assistantConversation(userMessage.text);

    console.log(aiMessage);

    const botReply = {
      sender: "bot",
      text: aiMessage,
    };

    setMessages((prev) => [...prev, botReply]);
  };

  return (
    <div
      className="d-flex flex-column border rounded shadow-sm mx-auto mt-4"
      style={{ maxWidth: "1000px", height: "800px" }}
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
              {msg.hasBookOption && (
                <div className="mt-2">
                  <button className="btn btn-sm btn-success">
                    <i className="bi bi-check-circle me-1"></i>Book
                  </button>
                </div>
              )}
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
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          <i className="bi bi-send"></i>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
