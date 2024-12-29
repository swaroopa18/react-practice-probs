import React, { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icons";

const LIKE = "like";
const UNLIKE = "unlike";
export default function App() {
  const [status, setStatus] = useState(UNLIKE);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const updateStatus = async () => {
    setLoading(true);
    setErrorMessage("");
    const action = status === LIKE ? "unlike" : "like";
    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action,
          }),
        },
      );
      const data = await response.json();
      if (data.message === "Success!") {
        setStatus((prev) => (prev == LIKE ? UNLIKE : LIKE));
      } else {
        setErrorMessage(data.message);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {!loading && (
        <button onClick={updateStatus} className={`heart ${status}`}>
          <HeartIcon className={undefined} /> Like
        </button>
      )}

      {loading && (
        <button className={`heart ${status}`}>
          <SpinnerIcon className={undefined} /> Like
        </button>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}
