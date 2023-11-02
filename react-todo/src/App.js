import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"
function useSemiPersistentState(key, initialState) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialState
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
function App() {
  const addTodo = (newTodo) => {
    setTodoList([...todoList, { id: Date.now(), title: newTodo }])
  }
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", [])

  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
