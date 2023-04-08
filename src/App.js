import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
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
          <li>
            <input type="checkbox" name="myCheckbox" value="true"/>
              Work work
          </li>
          <li>
            <input type="checkbox" name="myCheckbox" value="true"/>
              Work work
          </li>
          <li>
            <input type="checkbox" name="myCheckbox" value="true"/>
              Work work
          </li>
        </ul>
      </div>

      <div className="col">
        <h3>Completed</h3>
        <ul>
          <li>
            <input type="checkbox" name="myCheckbox" value="true" checked/>
              Work work
          </li>
          <li>
            <input type="checkbox" name="myCheckbox" value="true" checked/>
              Work work
          </li>
        </ul>
      </div>
    </div>

  </div>
  );
}

export default App;
