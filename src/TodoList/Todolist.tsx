import React from "react";
import "./styles.css";
import { Todo } from "./App";

interface TodoItemProps {
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

interface TodoListProps {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  updateTodo,
  deleteTodo,
}) => {
  const handleStatusToggle = () => updateTodo(todo);
  const handleDelete = () => deleteTodo(todo);

  return (
    <div className={`todo-item ${todo.status}`}>
      <input
        type="checkbox"
        checked={todo.status === "completed"}
        onChange={handleStatusToggle}
        aria-label={`Mark ${todo.text} as ${
          todo.status === "completed" ? "pending" : "completed"
        }`}
      />
      <span className={`todo-text ${todo.status}`}>{todo.text}</span>
      <button onClick={handleDelete} aria-label={`Delete ${todo.text}`}>
        Delete
      </button>
    </div>
  );
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  updateTodo,
  deleteTodo,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};
