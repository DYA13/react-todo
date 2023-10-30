import React, { useState } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"

function App() {
  // Step 1: Create a state variable for todoList
  const [todoList, setTodoList] = useState([])

  // Step 2: Declare the addTodo function
  const addTodo = (newTodo) => {
    // Step 2: Use the spread operator to update todoList with a new todo
    setTodoList([...todoList, { id: Date.now(), title: newTodo }])
  }

  return (
    <div>
      <h1>Todo List</h1>
      {/* Step 3: Pass the addTodo function as a prop to AddTodoForm */}
      <AddTodoForm onAddTodo={addTodo} />
      {/* Step 2: Pass todoList as a prop to TodoList */}
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
