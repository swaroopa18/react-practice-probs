import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./App";

interface AddTodoProps {
  onAdd: (todo: Todo) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [task, setTask] = useState("");

  const handleAddClick = () => {
    if (!task) {
      alert("Please enter valid task");
      return;
    }
    const newTodo: Todo = {
      id: uuidv4(),
      text:task,
      status: "pending",
    };
    onAdd(newTodo);
    setTask("");
  };

  return (
    <>
      <input
        name="todo"
        value={task}
        onChange={(event) => {
          setTask(event.target.value);
        }}
      />
      <button onClick={handleAddClick}>Add Todo</button>
    </>
  );
};
