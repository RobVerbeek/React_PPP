import React, {useState, useEffect} from 'react'

import TaskForm from "./components/TaskForm"
import "./App.css"
import TaskColumn from './components/TaskColumn'

import toDoIcon from './assets/direct-hit.png'
import doingIcon from './assets/glowing-star.png'
import doneIcon from './assets/check-mark-button.png'

const oldTasks = localStorage.getItem("tasks");
console.log(oldTasks);

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex)
    setTasks(newTasks)
  };

  return (
    <div className='app'>
      <TaskForm setTasks ={setTasks}/>
      <main className='app_main'>
        <TaskColumn columnName="To Do" image={toDoIcon} tasks={tasks} status="todo" handleDelete={handleDelete}/>
        <TaskColumn columnName="Doing" image={doingIcon} tasks={tasks} status="doing" handleDelete={handleDelete}/>
        <TaskColumn columnName="Done" image={doneIcon} tasks={tasks} status="done" handleDelete={handleDelete}/>
      </main>
    </div>
  )
}

export default App