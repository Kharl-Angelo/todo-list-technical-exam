import React, { useContext, useEffect } from "react";
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
import { handleAddTask } from "./actions/handleAddTask";
import { handleDelete } from "./actions/handleDelete";
import { handleUpdate, handleConfirmUpdate } from "./actions/handleUpdates";
import { handleCheckBox } from "./utils/handleCheckBox";

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
    filteredTasks,
    setFilteredTasks,
  } = useContext(MyContext);

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
  }, [tasks, selectedFilter, setFilteredTasks]);

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
              onClick={() =>
                handleAddTask(
                  newTask,
                  setTasks,
                  nextId,
                  setNextId,
                  setError,
                  setNewTask
                )
              }
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
                    onChange={() => handleCheckBox(task.id, setTasks)}
                    checked={task.completed}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
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
                    onClick={() => handleDelete(task.id, tasks, setTasks)}
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
                    onClick={() =>
                      handleUpdate(
                        task.id,
                        task.taskName,
                        isUpdating,
                        setIsUpdating,
                        setNewUpdatedTask
                      )
                    }
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
                    onClick={() =>
                      handleConfirmUpdate(
                        task.id,
                        setTasks,
                        setIsUpdating,
                        newUpdatedTask
                      )
                    }
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
