import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoFilters from './components/TodoFilters'
import type { Todo } from './types/todo'
import type { Filter } from './components/TodoFilters'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')

    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      newTodo,
    ])
  }

  const toggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    )
  }

  const editTodo = (id: number, text: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, text }
          : todo
      )
    )
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed
    }

    if (filter === 'completed') {
      return todo.completed
    }

    return true
  })

  const activeCount = todos.filter(
    (todo) => !todo.completed
  ).length

  return (
    <main className="app">
      <div className="todo-container">
        <h1>My Todo List</h1>

        <TodoForm onAddTodo={addTodo} />

        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </main>
  )
}

export default App