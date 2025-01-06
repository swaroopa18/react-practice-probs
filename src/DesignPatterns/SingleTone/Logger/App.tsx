import React from "react";
import "./styles.css";
import Logger from "./loggerService";

export default function App() {
  const logger1 = new Logger();
  const logger2 = new Logger();

  const onLog1 = () => logger1.log("Hello");
  const onLog2 = () => logger2.log("Hi");
  const allLogs = () => console.log(logger1.getLogs());

  return (
    <div className="App">
      <button onClick={onLog1}>Add1</button>
      <button onClick={onLog2}>Add2</button>
      <button onClick={allLogs}>All</button>
    </div>
  );
}
