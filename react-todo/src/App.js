import React, { useState } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"

function App() {
  // Step 1: Create a state variable for todoList
  const [todoList, setTodoList] = useState([])

  return (
    <div>
      <h1>Todo List</h1>
      {/* Step 2: Pass todoList as a prop to TodoList */}
      <TodoList todoList={todoList} />
      <AddTodoForm />
    </div>
  )
}

export default App
