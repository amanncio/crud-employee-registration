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

  const [newWage, setNewWage] = useState(0)

  const addEmployee = () => {
  Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage 
    }).then(() => {
      // console.log("success")
      alert(`O funcionário ${name} foi registrado com sucesso!`)
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

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: id
    }).then((response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id === id ? {
          id: val.id,
          name: val.name,
          country: val.country,
          position: val.position,
          age: val.age,
          wage: newWage
        } : val
      }))
      // alert("Updated");
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <h1>Cadastro de Funcionário / Employee Registration</h1>
      <div className="information">
        <label>Nome</label>
        <input 
          type="text" 
          onChange={(event) => {
            setName(event.target.value);
          }} 
        />
        <label>Idade</label>
        <input 
          type="number" 
          onChange={(event) => {
            setAge(event.target.value);  
          }}
        />
        <label>País</label>
        <input 
          type="text"
          onChange={(event) =>{
            setCountry(event.target.value);
          }}
        />
        <label>Cargo</label>
        <input 
          type="text" 
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Salário(ano)</label>
        <input 
          type="number" 
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button className='btn-add' onClick={addEmployee}>Adicionar Funcionário</button>
      </div>
      <hr />
      <div className='employees'>
        <button onClick={getEmployees} className='btn-get'>Exibir Funcionários</button>
        {employeeList.map((val, key) => {
          //O atributo key deve ser único e aplicado ao componente pai de cada iteração.
          return (
            <div key={key.toString()} className='employee'>
              <div className='employee-data'>
                <h4>Nome: {val.name}</h4>
                <h4>Idade: {val.age}</h4>
                <h4>País: {val.country}</h4>
                <h4>Cargo: {val.position}</h4>
                <h4>Salário(ano): {val.wage}</h4>
              </div>
              
              <div className='employee-update'>
                <input
                  type="text" 
                  placeholder="Altere o Salário"
                  onChange={(event) => {
                    setNewWage(event.target.value);  
                  }}
                />
                <button className='edit' onClick={() => {updateEmployeeWage(val.id)}}>Editar Salário</button>
                <button className='delete' onClick={() => {deleteEmployee(val.id)}}>Deletar</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
