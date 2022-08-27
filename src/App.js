import './App.css';
import React, { useState } from "react";


function App() {
  if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks',JSON.stringify([]));
  }
  const [task, setTask] = useState("")
  const [list, setList] = useState(JSON.parse(localStorage.getItem('tasks')))
  const [select, setSelect] = useState()
  const [update,setUpdate] = useState("");
  localStorage.setItem('tasks',JSON.stringify(list));

  function addTask() {
    if(task!==""){
      setList((prev) => [...prev, task]);
      setTask("");
    }
  }

  function updateTask() {
    if(update!==""){
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

  function deleteItem(e,delIndex) {
    const element = e.target.parentElement;
    element.style.animationPlayState = 'running';
    element.addEventListener('animationend',()=>{
      setList((prev) => {
        return prev.filter((item, index) => index !== delIndex);
      })
      window. location. reload(false); //// fix issue --> unable to delete same index twice
    })
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

  function selectItem(index) {
      if(select===index){
        updateTask();
      }
      else{
        setSelect(index);
        setUpdate(list[index]);
      }
  }

  
  return (
    <div className="app">
      <div className="header">
            <h1 className="heading">TASKS</h1>
            <input className="addField" type="text" onChange={handleInput} value={task} autoFocus onKeyUp={enterInput} />
            <button className="addButton" onClick={() => addTask()}>Add Task</button>
      </div>
            {/* {()=>{if(true) alert(true); return <h1>No Tasks</h1>}} */}
            {list.map((item, index) => {
                return (
                <div className="taskDiv" key={index} style={index%2===0?{backgroundColor:"hsl(28, 17%, 45%)"}:{backgroundColor:"brown"}}>
                <h3 className="taskText">{index+1}) {item}</h3>
            
            <button 
            className="delete" 
            onClick={(e) => {deleteItem(e,index)}} >Delete</button>
            <input className="updateField" type="text" onChange={handleUpdate} value={update}  hidden={index !== select} onKeyUp={enterUpdate}/>
            <button className="updateButton" onClick={() => selectItem(index)}>Update</button>
            </div>
                )
            })}
    </div>
  );
}

export default App;
