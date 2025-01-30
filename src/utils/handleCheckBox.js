// updating check box by inverting or setting the "completed:" property to the opposite value from the prev state
export const handleCheckBox = (id, setTasks) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};
