import React, { useEffect, useState } from "react";
import WebSocketService from "./websocketService";

const url = "wss://example.com/socket"; // Your WebSocket server URL

function ComponentA() {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const ws = new WebSocketService(url); // Get the shared WebSocket instance

    const handleMessage = (msg: string) => {
      console.log("ComponentA received:", msg);
      setMessage(msg); // Update state with the received message
    };

    ws.addListener(handleMessage); // Add listener

    return () => {
      ws.removeListener(handleMessage); // Clean up listener on unmount
    };
  }, []);

  return (
    <div>
      ComponentA: {message ? JSON.stringify(message) : "No messages yet"}
    </div>
  );
}

function ComponentB() {
  const sendMessage = () => {
    const ws = new WebSocketService(url); // Get the shared WebSocket instance
    ws.sendMessage({ type: "greeting", payload: "Hello from ComponentB!" });
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message from ComponentB</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <ComponentA />
      <ComponentB />
    </div>
  );
}
