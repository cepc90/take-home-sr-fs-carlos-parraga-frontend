import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleNewTaskDescriptionChange = (event) => {
    setNewTaskDescription(event.target.value);
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

  useEffect(() => {
    getAllTasksFromServer();
  }, []);

  return (
  <div className="container">
    <div className="row">
      <div className="col">
        <h1>Hello, world!</h1>
      </div>
      <div className="col text-right">
        Delete all tasks
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
        <input className="form-control" type="text" placeholder="Tasks filter"/>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col">
        <h3>Pending</h3>
        <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
          {pendingTasks.map(task => (
              <li key={task.id}>
                <label style={{cursor: "pointer"}}>
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
          {completedTasks.map(task => (
              <li key={task.id}>
                <label style={{cursor: "pointer"}}>
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
