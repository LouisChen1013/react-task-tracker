import { useState } from 'react';


const AddTask = ( {onAdd} ) => {

    // Declare component level state

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        // prevent submit action
        e.preventDefault()
        
        if (!text) {
            alert('Please add a task')
            return
        }
        else{
        // call onAdd function and pass in a object with text, day, and reminder
        onAdd({text, day, reminder})
        // clear the form
        setText('')
        setDay('')
        setReminder(false)
        }
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type="text" placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type="text" placeholder='Day & Time' value={day} onChange={(e) => setDay(e.target.value) }/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                {/* since it's a checkbox, we have to use currentTarget.checked to get T/F */}
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input className='btn btn-block' type="submit" value='Save Task' />
        </form>
            
    )
}

export default AddTask
