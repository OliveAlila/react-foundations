import { useState } from 'react'

interface TodoFormProps {
  onAddTodo: (text: string) => void
}

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (text.trim() === '') return

    onAddTodo(text.trim())
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">
        Add
      </button>
    </form>
  )
}

export default TodoForm