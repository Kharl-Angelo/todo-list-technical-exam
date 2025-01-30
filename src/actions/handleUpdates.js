// updating taskname, the "isUpdating" variable is to determine whether we are updating or not, if so, we will display the input attribute that initially displaying "none", otherwise it will remain false to display at "none"
export const handleUpdate = (
  id,
  name,
  isUpdating,
  setIsUpdating,
  setNewUpdatedTask
) => {
  setIsUpdating(id === isUpdating ? null : id);
  setNewUpdatedTask(name);
};

//handling confirm button. once the "Update" button is clicked when in updating status we will get the value of "newUpdatedTask" then assigning it as a new taskName for specific task.
export const handleConfirmUpdate = (
  id,
  setTasks,
  setIsUpdating,
  newUpdatedTask
) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === id ? { ...task, taskName: newUpdatedTask } : task
    )
  );
  setIsUpdating(null);
};
