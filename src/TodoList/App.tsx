import "./Styles.css";
import React, { useEffect, useRef, useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { AddTodo } from "./AddTodo";
import { TodoList } from "./Todolist";

export interface Todo {
  id: string;
  text: string;
  status: "completed" | "pending";
}

const LOCAL_STORAGE_KEY = "todos";

const getTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState("");
  const previousTodosRef = useRef<Todo[] | null>(null);

  const onAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const onApplyFilter = (filter: string) => {
    setFilter(filter);
  };

  const onUpdateTodo = (todo: Todo) => {
    const updatedTodos: Todo[] = todos.map((item) =>
      item.id === todo.id
        ? {
            ...item,
            status: item.status === "completed" ? "pending" : "completed",
          }
        : item
    );
    setTodos(updatedTodos);
  };

  const onDeleteTodo = (todo: Todo) => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.status === "completed";
    if (filter === "pending") return todo.status === "pending";
    return true;
  });

  useEffect(() => {
    const savedTodos = getTodosFromLocalStorage();
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    if (JSON.stringify(previousTodosRef.current) !== JSON.stringify(todos)) {
      saveTodosToLocalStorage(todos);
      previousTodosRef.current = todos;
    }
  }, [todos]);

  return (
    <div className="App">
      <h1>Todos</h1>
      <AddTodo onAdd={onAddTodo} />
      <TodoFilter onApply={onApplyFilter} />
      <TodoList
        todos={filteredTodos}
        updateTodo={onUpdateTodo}
        deleteTodo={onDeleteTodo}
      />
    </div>
  );
};

export default App;
