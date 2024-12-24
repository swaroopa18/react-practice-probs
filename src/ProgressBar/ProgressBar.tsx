import React, { useState, useEffect } from "react";
import "./styles.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let startTime = Date.now();
    const duration = 200000;
    const interval = 10;

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage === 100) {
        clearInterval(intervalId);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  return <progress style={{ width: "100%" }} value={progress} />;
};

export default function App() {
  const [bars, setBars] = useState<number[]>([]);

  return (
    <div className="App">
      <button onClick={() => setBars([...bars, 0])}>Add</button>
      <div className="progressBars">
        {bars.map(() => (
          <ProgressBar />
        ))}
      </div>
    </div>
  );
}
