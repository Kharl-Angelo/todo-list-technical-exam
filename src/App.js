import TodoList from "./Todolist.js";
import React, { createContext, useState } from "react";

export const MyContext = createContext();

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isUpdating, setIsUpdating] = useState(null);
  const [newUpdatedTask, setNewUpdatedTask] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all-tasks");
  const [nextId, setNextId] = useState(1);
  const [error, setError] = useState("");

  return (
    <>
      <MyContext.Provider
        value={{
          tasks,
          setTasks,
          newTask,
          setNewTask,
          isUpdating,
          setIsUpdating,
          newUpdatedTask,
          setNewUpdatedTask,
          selectedFilter,
          setSelectedFilter,
          nextId,
          setNextId,
          error,
          setError,
        }}
      >
        <TodoList />
      </MyContext.Provider>
    </>
  );
}

export default App;
