import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./App";
import {
  Button,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  useTheme,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { RootBox } from "./cuztomizedStyle";

const Todolist = () => {
  const contentTheme = useTheme();
  console.log(contentTheme);

  const {
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
  } = useContext(MyContext);

  // handling to add newTask in "tasks" array of objects. updating the "tasks" array by spread method to update based on the last state/status of a "tasks" array

  const handleAddTask = () => {
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

  // handle deleting by using filtering method, then set the "tasks" to the filtered one
  const handleDelete = (id) => {
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  };

  // updating check box by inverting or setting the "completed:" property to the opposite value from the prev state
  const handleCheckBox = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // updating taskname, the "isUpdating" variable is to determine whether we are updating or not, if so, we will display the input attribute that initially displaying "none", otherwise it will remain false to display at "none"
  const handleUpdate = (id, name) => {
    setIsUpdating(id === isUpdating ? null : id);
    setNewUpdatedTask(name);
  };

  //handling confirm button. once the "Update" button is clicked when in updating status we will get the value of "newUpdatedTask" then assigning it as a new taskName for specific task.
  const handleConfirmUpdate = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, taskName: newUpdatedTask } : task
      )
    );
    setIsUpdating(null);
  };

  // using .useEffect, for filtering the tasks. We will run the .useEffect when the state of "tasks" and "selectedFitler" changes. The function inside the .useEffect is that it filtered through each "task" of "tasks" array then identfying the status whether the "completed" property has a value of true or false, then filtering it and assigned the filtered value to the "updatedTask" which was initially an empty array then setting the "filteredTasks" based on the value of "updatedTask"

  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const filterTask = () => {
      let updatedTask = [];
      if (selectedFilter === "all-tasks") {
        updatedTask = tasks;
      } else if (selectedFilter === "active-tasks") {
        updatedTask = tasks.filter((task) => !task.completed);
      } else if (selectedFilter === "completed-tasks") {
        updatedTask = tasks.filter((task) => task.completed);
      } else {
        return false;
      }
      setFilteredTasks(updatedTask);
    };
    filterTask();
  }, [tasks, selectedFilter]);

  return (
    <RootBox>
      <Container>
        <Typography variant="h4" sx={{ fontStyle: "italic" }}>
          Todo-List
        </Typography>

        <Stack
          direction={{ sm: "row", xs: "column" }}
          spacing={{ sm: 2, xs: 1 }}
          alignItems={{ sm: "center" }}
          justifyContent={{ sm: "space-between" }}
          marginBottom="0.7rem"
        >
          <TextField
            type="text"
            variant="filled"
            sx={{
              flex: 1,
              "& .MuiInputBase-input": {
                padding: "0.5rem",
              },
            }}
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            error={!!error}
            helperText={error}
          />
          <Stack
            direction="row"
            spacing={2}
            justifyContent={{ sm: "space-between", xs: "space-evenly" }}
            alignItems="center"
          >
            <Button
              size="small"
              sx={{
                flex: 1,
                maxWidth: "6rem",
                fontWeight: "bold",
                padding: "0.5rem 0.8rem !important",
                height: "0",
              }}
              color="primary"
              variant="contained"
              onClick={handleAddTask}
            >
              Add Task
            </Button>

            <Select
              sx={{
                "& .MuiSelect-select": {
                  padding: "0.5rem 0.8rem",
                },
              }}
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <MenuItem value="all-tasks"> All Tasks </MenuItem>
              <MenuItem value="active-tasks"> Active Tasks </MenuItem>
              <MenuItem value="completed-tasks"> Completed Tasks </MenuItem>
            </Select>
          </Stack>
        </Stack>

        <Stack>
          {filteredTasks.map((task) => (
            <Stack
              key={task.id}
              marginBottom="0.5rem"
              borderRadius="10px"
              sx={{
                backgroundColor: task.completed ? "#AEEA94" : "#edebe3",
                transition: "0.5s",
              }}
            >
              <Stack
                direction={{ sm: "row", xs: "column" }}
                justifyContent="space-between"
                display={{ display: isUpdating === task.id ? "none" : "flex" }}
              >
                <Stack direction="row" alignItems="center">
                  <Checkbox
                    sx={{
                      margin: "0 0.5rem",
                    }}
                    type="checkbox"
                    onChange={() => handleCheckBox(task.id)}
                    checked={task.completed}
                  />

                  <Typography
                    variant="h6"
                    textDecoration={task.completed ? "line-through" : "none"}
                  >
                    {task.taskName}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                  marginBottom={{ sm: "0rem", xs: "0.5rem" }}
                >
                  <Button
                    size="small"
                    sx={{
                      fontWeight: "600",
                      margin: "0 1rem",
                      maxWidth: "6.5rem",
                    }}
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>

                  <Button
                    size="small"
                    sx={{
                      fontWeight: "600",
                      marginRight: "1rem",
                      maxWidth: "6.5rem",
                    }}
                    variant="outlined"
                    color="success"
                    startIcon={<EditIcon />}
                    onClick={() => handleUpdate(task.id, task.taskName)}
                  >
                    Update
                  </Button>
                </Stack>
              </Stack>

              <Stack
                padding="0.5rem"
                direction={{
                  sm: "row",
                  xs: "column",
                }}
                spacing={2}
                display={isUpdating === task.id ? "flex" : "none"}
              >
                <TextField
                  sx={{
                    flex: "1",
                  }}
                  type="text"
                  variant="standard"
                  value={newUpdatedTask}
                  onChange={(e) => setNewUpdatedTask(e.target.value)}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ justifyContent: "space-evenly" }}
                >
                  <Button
                    size="small"
                    sx={{
                      fontWeight: "600",
                      maxWidth: "6.5rem",
                    }}
                    variant="contained"
                    color="error"
                    onClick={() => setIsUpdating(null)}
                  >
                    {" "}
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      fontWeight: "600",
                      maxWidth: "6.5rem",
                    }}
                    variant="contained"
                    color="success"
                    onClick={() => handleConfirmUpdate(task.id)}
                  >
                    {" "}
                    Confirm
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Container>
    </RootBox>
  );
};

export default Todolist;
