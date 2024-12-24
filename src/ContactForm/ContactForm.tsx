import React from "react";
import submitForm from "./submitForm";
const SUBMIT_URL = "https://www.greatfrontend.com/api/questions/contact-form";
/* https://www.greatfrontend.com/questions/user-interface/contact-form/react?framework=react */

export default function App() {
  return (
    <form
      action={SUBMIT_URL}
      method="POST"
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      className="form"
      onSubmit={submitForm}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "150px" }}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "150px" }}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "150px" }}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message"></textarea>
      </div>

      <button type="submit">send</button>
    </form>
  );
}
