import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";


function App() {
  
  const [task, setTask] = useState("")
  const [list, setList] = useState([])
  const [select, setSelect] = useState()
  const [update,setUpdate] = useState("");


  function addTask() {
      setList((prev) => [...prev, task]);
      setTask("");
  }

  function deleteItem(delIndex) {
    setList((prev) => {
      return prev.filter((item, index) => index !== delIndex);
    })
  }

  function selectItem(index) {
      if(select==index){
        updateTask();
      }
      else{
        setSelect(index);
        setUpdate(list[index]);
      }
  }

  function updateTask() {
      setList((prev) => {
          return prev.map((item, index) => {
              if (index === select) {
                  return update;
              } else {
                  return item;
              }
          })
      })
      setSelect();
  }

  function handleInput(e) {
      setTask(e.target.value);
  }
  function handleUpdate(e) {
    setUpdate(e.target.value);
}
function enterInput(e){
  if(e.key === "Enter"&&task!=""){
      addTask();
  }
}
function enterUpdate(e){
  if(e.key === "Enter"&&update!=""){
      updateTask();
  } 
}

  return (
    <div className="App">
      <h1>TASKS</h1>
            <input type="text" onChange={handleInput} value={task} autoFocus onKeyUp={enterInput} />
            <button onClick={() => addTask()}>Add Task</button>


            {list.map((item, index) => {
                return (
                <div key={index}>
                <h3 className="yellowHeading">{index+1}) {item}</h3>
            
               
            <button onClick={() => deleteItem(index)} >Delete</button>
            <input type="text" onChange={handleUpdate} value={update}  hidden={index !== select} onKeyUp={enterUpdate}/>
            <button onClick={() => selectItem(index)}>Update</button>
            </div>
                )
            })}
    </div>
  );
}

export default App;
