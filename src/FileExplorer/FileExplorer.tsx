import React, { useState } from "react";

export default function FileExplorer({ data }) {
  const [expanded, setExpanded] = useState({});

  const toggleFolder = (name) => {
    setExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const hasChild = (item) => item.children?.length > 0;
  return (
    <div>
      {data.map((item) => {
        if (!hasChild(item)) {
          return <div>{item.name}</div>;
        }

        return (
          <div key={item.name} style={{ marginLeft: "10px" }}>
            <span
              onClick={() => toggleFolder(item.name)}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: "blue",
              }}
            >
              {expanded[item.name] ? "📂" : "📁"} {item.name}
            </span>
            {expanded[item.name] && item.children && (
              <FileExplorer data={item.children} />
            )}
          </div>
        );
      })}
    </div>
  );
}
