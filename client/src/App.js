import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([])

  const addEmployee = () => {
  Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage 
    }).then(() => {
      // console.log("success")
      alert(`The employee ${name} was successfully registered!`)
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        },
      ]);
    });
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      console.log(response)
      setEmployeeList(response.data)
    })
  }

  return (
    <div className="App">
      <h1>Employee Registration</h1>
      <div className="information">
        <label>Name</label>
        <input 
          type="text" 
          onChange={(event) => {
            setName(event.target.value);
          }} 
        />
        <label>Age</label>
        <input 
          type="number" 
          onChange={(event) => {
            setAge(event.target.value);  
          }}
        />
        <label>Country</label>
        <input 
          type="text"
          onChange={(event) =>{
            setCountry(event.target.value);
          }}
        />
        <label>Position</label>
        <input 
          type="text" 
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage(year)</label>
        <input 
          type="number" 
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button className='btn-add' onClick={addEmployee}>Add Employee</button>
      </div>
      <hr />
      <div className='employees'>
        <button onClick={getEmployees} className='btn-get'>Show Employees</button>
        {employeeList.map((val, key) => {
          //O atributo key deve ser único e aplicado ao componente pai de cada iteração.
          return (
            <div key={key.toString()} className='employee'>
              <h4>Name: {val.name}</h4>
              <h4>Age: {val.age}</h4>
              <h4>Country: {val.country}</h4>
              <h4> Position: {val.position}</h4>
              <h4>Wage: {val.wage}</h4>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
