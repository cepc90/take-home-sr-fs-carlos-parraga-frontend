import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleNewTaskDescriptionChange = (event) => {
    setNewTaskDescription(event.target.value);
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  function submitNewTask(event){
    event.preventDefault();
    setNewTaskDescription("");
    fetch("http://localhost:8080/api/task", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: newTaskDescription
      })
    })
        .then(function () {
          getAllTasksFromServer();
        })
        .catch((error) => {
          console.error(error);
        });
  }

  function markTaskAsCompleted(event, id){
    event.preventDefault();
    setNewTaskDescription("");
    fetch("http://localhost:8080/api/task/markAsCompleted", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
        .then(function () {
          getAllTasksFromServer();
        })
        .catch((error) => {
          console.error(error);
        });
  }

  function markTaskAsPending(event, id){
    event.preventDefault();
    setNewTaskDescription("");
    fetch("http://localhost:8080/api/task/markAsPending", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
        .then(function () {
          getAllTasksFromServer();
        })
        .catch((error) => {
          console.error(error);
        });
  }

  let updateTasksTimer = null;

  function getAllTasksFromServer() {
    if (updateTasksTimer != null) {
      clearTimeout(updateTasksTimer);
    }

    getPendingTasksFromServer();
    getCompletedTasksFromServer();

    updateTasksTimer = setTimeout(getAllTasksFromServer, 5000); // Update tasks from server every 5 seconds
  }

  function getPendingTasksFromServer() {
    fetch('http://localhost:8080/api/pendingTasks')
        .then(response => response.json())
        .then(data => setPendingTasks(data))
        .catch(error => console.error(error));
  }

  function getCompletedTasksFromServer() {
    fetch('http://localhost:8080/api/completedTasks')
        .then(response => response.json())
        .then(data => setCompletedTasks(data))
        .catch(error => console.error(error));
  }

  function confirmDeleteAllTasks() {
    const result = window.confirm('Are you sure you want to delete all tasks?');
    if (result) {
      deleteAllTasks();
    }
  }

  function deleteAllTasks() {
    fetch("http://localhost:8080/api/deleteAllTasks")
        .then(response => getAllTasksFromServer())
        .catch((error) => {
          console.error(error);
        });
  }

  useEffect(() => {
    getAllTasksFromServer();
  }, []);

  return (
  <div className="container">
    <div className="row">
      <div className="col">
        <h1>Awesome list v1.0.0</h1>
      </div>
      <div className="col">
        <div style={{width: '100%', textAlign: "right", cursor: "pointer"}}>
          <span className="blue-hover" onClick={confirmDeleteAllTasks}>
            Delete all tasks
          </span>
        </div>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col">
        <form onSubmit={submitNewTask}>
          <div className="input-group">
            <input className="form-control" type="text" placeholder="New task name" value={newTaskDescription} onChange={handleNewTaskDescriptionChange} />
            <div className="input-group-append">
              <input className="btn btn-info" type="submit" value="Add"/>
            </div>
          </div>
        </form>
      </div>
      <div className="col">
        <input className="form-control" type="text" placeholder="Tasks filter" value={filterText} onChange={handleFilterTextChange} />
      </div>
    </div>

    <div className="row mt-3">
      <div className="col">
        <h3>Pending</h3>
        <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
          {pendingTasks
              .filter(task => task.description.toLowerCase().includes(filterText.toLowerCase()))
              .map(task => (
                  <li key={task.id}>
                    <label style={{cursor: "pointer"}} onClick={(e) => markTaskAsCompleted(e, task.id)}>
                      <input className={"mx-2"} type="checkbox" name="myCheckbox" value="true"/>
                      {task.description}
                    </label>
                  </li>
              ))}
        </ul>
      </div>

      <div className="col">
        <h3>Completed</h3>
        <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
          {completedTasks
              .filter(task => task.description.toLowerCase().includes(filterText.toLowerCase()))
              .map(task => (
                  <li key={task.id}>
                    <label style={{cursor: "pointer"}} onClick={(e) => markTaskAsPending(e, task.id)}>
                      <input className={"mx-2"} type="checkbox" name="myCheckbox" value="true" checked/>
                      {task.description}
                    </label>
                  </li>
              ))}
        </ul>
      </div>
    </div>

  </div>
  );
}

export default App;
