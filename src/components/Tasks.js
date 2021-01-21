import Task from './Task'

// This tasks array is for testing, we will use the state hook (useState) to update the tasks
// const tasks = [
//     {
//         id:1,
//         text: 'Lorem',
//         day: 'Feb 5th at 2:30pm',
//         reminder: true,
//     },
//     {
//         id:2,
//         text: 'ipsum',
//         day: 'Feb 6th at 2:30pm',
//         reminder: true,
//     },
//     {
//         id:3,
//         text: 'dolor sit',
//         day: 'Feb 7th at 2:30pm',
//         reminder: false,
//     }
// ]

const Tasks = ( {tasks, onDelete, onToggle} ) => {

    return (
        <div>
            {/* loop through the tasks array (from the parent component) and pass each task as a props to the child component(Task) */}
            {tasks.map( (task, index) => (<Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />) )}
        </div>
    )
}

export default Tasks
