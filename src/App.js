import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {

  const [showAddTask, setShowAddTask] = useState(false)

// Declare app level state, but will move the data to our json mock data server
//   const [tasks, setTasks] = useState([
//     {
//         id:1,
//         text: 'Complete React Tutorial',
//         day: 'Feb 5th at 2:30pm',
//         reminder: true,
//     },
//     {
//         id:2,
//         text: 'Update my Resume/Cover Letter',
//         day: 'Feb 6th at 2:30pm',
//         reminder: true,
//     },
//     {
//         id:3,
//         text: 'Finish my web profolio',
//         day: 'Feb 7th at 2:30pm',
//         reminder: false,
//     }
// ])


const [tasks, setTasks] = useState([])

// Fetch all tasks from the json server http://localhost:5000/tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  // console.log(data)
  return data
}

// Fetch a task from the json server http://localhost:5000/tasks
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  // console.log(data)
  return data
}

// Retrieve our tasks from the server and save into state
useEffect(() => {
  const getTasks = async () => {
    const tasksFromSever = await fetchTasks()
    setTasks(tasksFromSever)
  }

  getTasks()
},[])

// Delete Task

const deleteTask = async (id) => {
  await fetch (`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE'
  })
  // console.log('delete', id);
  // a new array that filter out the tasks array based on the condition (id)
  setTasks(tasks.filter(task => task.id !== id))
}

// Toggle Reminder

const toggleReminder = async (id) => {

  const taskToToggle = await fetchTask(id)
  const updatedTask ={ ...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch (`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()
  // console.log(id)
  setTasks(tasks.map(task => task.id === id ? {...task, reminder: data.reminder} :task))
}

// Add Task

const addTask = async (task) => {
  // console.log(task)
  // Use index as an id, so don't need anymore
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])

  const res = await fetch (`http://localhost:5000/tasks/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const newTask = await res.json()
  // console.log(newTask)

  setTasks([...tasks, newTask])
  
}

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => (
        <div>
          {/* && is a shorter way of doing tenary without an else */}
          {showAddTask && <AddTask onAdd={addTask} />}
          {/* pass two props to the child component: tasks(array) and onDelete(function) */}
          { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
        </div>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
