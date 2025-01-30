// handling to add newTask in "tasks" array of objects. updating the "tasks" array by spread method to update based on the last state/status of a "tasks" array
export const handleAddTask = (
  newTask,
  setTasks,
  nextId,
  setNextId,
  setError,
  setNewTask
) => {
  if (newTask.trim() !== "") {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: nextId, taskName: newTask, completed: false, isChanging: false },
    ]);
    setNextId((prevId) => prevId + 1);
    setError("");
  } else {
    setError("Please enter proper task!");
  }
  setNewTask("");
};
