import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "../DebounceImp/DebounceImp";

const App = () => {
  const totalItems = Array.from({ length: 100 }, (_, i) => i + 1);
  const [items, setItems] = useState(totalItems.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);

  const loadMoreItems = () => {
    setTimeout(() => {
      setItems((prevItems) => {
        const curLen = prevItems.length;
        if (curLen < totalItems.length) {
          const newItems = totalItems.slice(curLen, curLen + 20);
          return [...prevItems, ...newItems];
        } else {
          setHasMore(false);
          return prevItems;
        }
      });
    }, 1500);
  };

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      loadMoreItems();
    }
  };

  const debouncedHandleScroll = useCallback(debounce(handleScroll, 1000), []);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [debouncedHandleScroll]);

  return (
    <div>
      <ul>
        {items.map((_, i) => (
          <li
            key={`Item-${i}`}
            style={{ border: "1px solid black", padding: "20px" }}
          >
            Item {i}
          </li>
        ))}
      </ul>
      {hasMore && <p>Loading elements.....</p>}
    </div>
  );
};
export default App;
