import './App.css';
import React, { useState } from "react";


function App() {
  
  const [task, setTask] = useState("")
  const [list, setList] = useState([])
  const [select, setSelect] = useState()
  const [update,setUpdate] = useState("");


  function addTask() {
    if(task!=""){
      setList((prev) => [...prev, task]);
      setTask("");
    }
  }

  function updateTask() {
    if(update!=""){
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
    else{
      alert("Task Cannot be Empty. Use Delete if there is no Task")
    }
  }

  function handleInput(e) {
    setTask(e.target.value);
  }
  function handleUpdate(e) {
    setUpdate(e.target.value);
  }
  function enterInput(e){
    if(e.key === "Enter"){
      addTask();
    }
  }
  function enterUpdate(e){
    if(e.key === "Enter"){
      updateTask();
    } 
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


  return (
    <div className="app">
      <h1 className="heading">TASKS</h1>
            <input className="addField" type="text" onChange={handleInput} value={task} autoFocus onKeyUp={enterInput} />
            <button className="addButton" onClick={() => addTask()}>Add Task</button>


            {list.map((item, index) => {
                return (
                <div className="taskDiv" key={index}>
                <h3 className="taskText">{index+1}) {item}</h3>
            
               
            <button className="delete" onClick={() => deleteItem(index)} >Delete</button>
            <input className="updateField" type="text" onChange={handleUpdate} value={update}  hidden={index !== select} onKeyUp={enterUpdate}/>
            <button className="updateButton" onClick={() => selectItem(index)}>Update</button>
            </div>
                )
            })}
    </div>
  );
}

export default App;
