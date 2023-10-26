import React, { useState } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"

function App() {
  // Step 1: Create a state variable for todoList
  const [todoList, setTodoList] = useState([])

  // Step 3: Define the onAddTodo function to add new todos
  const onAddTodo = (newTodo) => {
    setTodoList([...todoList, { id: Date.now(), title: newTodo }])
  }

  return (
    <div>
      <h1>Todo List</h1>
      {/* Step 4: Pass the onAddTodo function as a prop to AddTodoForm */}
      <AddTodoForm onAddTodo={onAddTodo} />
      {/* Step 2: Pass todoList as a prop to TodoList */}
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
