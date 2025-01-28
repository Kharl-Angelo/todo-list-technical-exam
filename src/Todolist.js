
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './App';
import { Button, Checkbox, TextField, Select, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Todolist = () => {
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
  
  const handleAddTask = ()=> {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) =>  [...prevTasks, {id: nextId, taskName: newTask, completed: false, isChanging: false },]);
      setNextId((prevId) => prevId + 1)
      setError("")
    } else {
      setError("Please enter proper task!")
    }
    setNewTask("");
  }

  // handle deleting by using filtering method, then set the "tasks" to the filtered one
  const handleDelete = (id) => {
    const updatedTask = tasks.filter((task) => 
      task.id !== id
    )
    setTasks(updatedTask);
  }

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
    setIsUpdating(id === isUpdating ? null : id)
    setNewUpdatedTask(name);
  }

  //handling confirm button. once the "Update" button is clicked when in updating status we will get the value of "newUpdatedTask" then assigning it as a new taskName for specific task.
  const handleConfirmUpdate = (id) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === id ? {...task, taskName: newUpdatedTask }: task
      )
    )
    setIsUpdating(null)
  }

  // using .useEffect, for filtering the tasks. We will run the .useEffect when the state of "tasks" and "selectedFitler" changes. The function inside the .useEffect is that it filtered through each "task" of "tasks" array then identfying the status whether the "completed" property has a value of true or false, then filtering it and assigned the filtered value to the "updatedTask" which was initially an empty array then setting the "filteredTasks" based on the value of "updatedTask"

  const [ filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const filterTask = () => {
      let updatedTask = [];
        if (selectedFilter === "all-tasks") {
          updatedTask = tasks;
        } else if (selectedFilter === "active-tasks") {
          updatedTask = tasks.filter((task) => !task.completed)
        } else if (selectedFilter === "completed-tasks") {
          updatedTask = tasks.filter((task) => task.completed)
        } else {
          return false;
        }
        setFilteredTasks(updatedTask);
    };
    filterTask();
  }, [tasks, selectedFilter])

  return (
    <div className="main-container">
      <div className="sub-main-container">
      <h1 className='title-todolist'> Todo-List </h1>

      <div className='to-inputs'>
        <div className='sub1-to-inputs'>
        <TextField 
          type="text" 
          variant="filled"
          sx={{
            width: '100%',
          }}
          onChange={(e) => setNewTask (e.target.value)} 
          value={newTask}
          error={!!error}
          helperText={error}
        />
        </div>
        <div className='sub-to-inputs'>
        <Button 
          sx={{
            backgroundColor: "#ece8dc;",
            color: "black",
            fontWeight: "bold",
          }}
          variant='contained'
          onClick={handleAddTask}>
            Add Task
        </Button>

        <Select 
          value={selectedFilter} 
          sx={{
            marginLeft: '1em'
          }}
          onChange={(e) => setSelectedFilter (e.target.value)}>
            <MenuItem value="all-tasks"> All Tasks </MenuItem>
            <MenuItem value="active-tasks"> Active Tasks </MenuItem>
            <MenuItem value="completed-tasks"> Completed Tasks </MenuItem>
        </Select>
        </div>
      </div>

      <div className='tasks-container'>
        {filteredTasks.map((task) => 

          <div 
            key={task.id} 
            className='task-container'
            style={{backgroundColor: task.completed ? "#AEEA94" : "#edebe3"}}
            >
              <div 
                className="main-task-container" 
                style={{display: isUpdating === task.id ? "none" : "flex"}}>

                <div className='first-task-container'>
                <Checkbox 
                  sx={{
                    margin: '0 1rem'
                  }}
                  className="checkbox" 
                  type='checkbox' 
                  onChange={() => handleCheckBox(task.id)} checked={task.completed}/>

                <p 
                  className='task-name' 
                  style={{textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.taskName}
                </p>
                </div>
                <div className='second-task-container'>
                <Button 
                  sx={{
                    margin: '0 1rem'
                  }}
                  variant='outlined'
                  color='error'
                  className='delete-btn' 
                  startIcon={<DeleteIcon/>}
                  onClick={() => handleDelete(task.id)}> Delete 
                </Button>

                <Button 
                  sx={{
                    marginRight: '1rem'
                  }}
                  variant='outlined'
                  color='success'
                  className='update-btn' 
                  startIcon={<EditIcon/>}
                  onClick={() => handleUpdate(task.id, task.taskName)}> Update 
                </Button>
                </div>
              </div>

              <div 
                className="updating-container" 
                style={{display: isUpdating === task.id ? "flex" : "none"}}>
                <div className='first-updating-container'>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  type='text' 
                  variant='standard'
                  value={newUpdatedTask} onChange={(e) => setNewUpdatedTask (e.target.value)}
                />
                </div>
                <div className='second-updating-container'>
                <Button
                  sx={{
                    marginRight: "2.1rem"
                  }}
                  variant='contained'
                  color='error'
                  onClick={() => setIsUpdating (null)}> Cancel 
                </Button>

                <Button 
                  variant='contained'
                  color='success'
                  onClick={() => handleConfirmUpdate(task.id)}> Confirm 
                </Button>
                </div>
              </div>

          </div>

        )}

      </div>
      </div>
    </div>
  )
}

export default Todolist