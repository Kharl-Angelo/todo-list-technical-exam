// handle deleting by using filtering method, then set the "tasks" to the filtered one
export const handleDelete = (id, tasks, setTasks) => {
  const updatedTask = tasks.filter((task) => task.id !== id);
  setTasks(updatedTask);
};
