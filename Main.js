import React, { useState } from 'react';
import './App.css';

function Main() {

  const [tasks, setTasks] = useState(
    [
      { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
      { name: "React", category: "wip", bgcolor: "pink" },
      { name: "Vue", category: "complete", bgcolor: "skyblue" }
    ]
  )

  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  }

  const onDragOver = (ev) => {
    ev.preventDefault();
  }

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let tasks2 = tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });
    console.log(tasks2,"tasks2")
    setTasks(tasks2);
  }

  var tasks1 = {
      wip: [],
      complete: []
  }

  console.log(tasks,"tasks")
  tasks.forEach ((t) => {
    tasks1[t.category].push(
          <div key={t.name} 
              onDragStart = {(e) => onDragStart(e, t.name)}
              draggable
              className="draggable"
              style = {{backgroundColor: t.bgcolor}}
          >
              {t.name}
          </div>
      );
  });


  return (
    <div className="App">
      <div className="container-drag">

        <h2 className="header">DRAG & DROP DEMO</h2>
        <div className="wip"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => { onDrop(e, "wip") }}>
          <span className="task-header">WIP</span>
          {tasks1.wip}
        </div>

        <div className="droppable"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "complete")}>
          <span className="task-header">COMPLETED</span>
          {tasks1.complete}
        </div>
      </div>
    </div>
  );
}

export default Main;
