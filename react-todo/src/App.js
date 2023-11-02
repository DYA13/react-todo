import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"

function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  )

  const addTodo = (newTodo) => {
    setTodoList([...todoList, { id: Date.now(), title: newTodo }])
  }
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList))
  }, [todoList])

  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
