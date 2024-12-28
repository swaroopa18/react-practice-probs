import React, { useState } from "react";

// Debouncing: Fires the function only once after a pause.
// Throttling: Ensures the function runs at most once in a specified time frame.

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const throttle = (fn, delay) => {
  let isThrottled = false;

  return (...args) => {
    if (!isThrottled) {
      fn(...args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
};

const App = () => {
  const [list, setList] = useState<string[]>([]);

  const handleAdd = () => {
    setList((prev: string[]) => [...prev, "hi"]);
  };

  const logScroll = () => {
    console.log("Scrolled!");
  };

  const throttledLogScroll = throttle(logScroll, 5000);

  window.addEventListener("scroll", throttledLogScroll);

  const debouceFn = debounce(handleAdd, 20);

  return (
    <div className="App">
      <button onClick={debouceFn}>Add</button>
      <ul>
        {list.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
