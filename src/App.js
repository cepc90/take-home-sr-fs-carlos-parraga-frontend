import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  function getPendingTasksFromServer() {
    console.log('hi');
    fetch('http://localhost:8080/api/pendingTasks')
        .then(response => response.json())
        .then(data => setPendingTasks(data))
        .catch(error => console.error(error));
  }

  function getCompletedTasksFromServer() {
    console.log('hello');
    fetch('http://localhost:8080/api/completedTasks')
        .then(response => response.json())
        .then(data => setCompletedTasks(data))
        .catch(error => console.error(error));
  }

  useEffect(() => {
    getPendingTasksFromServer();
    getCompletedTasksFromServer();
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
        <input type="text"/>
        <input type="submit" value="Add"/>
      </div>
      <div className="col">
        <input type="text"/>
      </div>
    </div>

    <div className="row mt-3">
      <div className="col">
        <h3>Pending</h3>
        <ul>
          {pendingTasks.map(task => (
              <li key={task.id}>
                <input type="checkbox" name="myCheckbox" value="true"/>
                {task.description}
              </li>
          ))}
        </ul>
      </div>

      <div className="col">
        <h3>Completed</h3>
        <ul>
          {completedTasks.map(task => (
              <li key={task.id}>
                <input type="checkbox" name="myCheckbox" value="true" checked/>
                {task.description}
              </li>
          ))}
        </ul>
      </div>
    </div>

  </div>
  );
}

export default App;
