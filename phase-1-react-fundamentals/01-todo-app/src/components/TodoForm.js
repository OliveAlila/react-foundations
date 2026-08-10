import React, {useState} from 'react'

export const TodoForm = () => {
 const [value, setValue] = useState('')
  return (
   <form className='TodoForm'>
    <input type='text' className = 'todo-input' placeholder='Add a new task' onChange = {(e) => setValue(e.target.value)} />
    <button type='submit' className='todo-button'>Add Task</button>
   </form>
  )
}

export default TodoForm
