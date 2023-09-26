import React from "react"

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Review course materials" },
  { id: 3, title: "Submit project proposal" }
]

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      {todoList.map((todoItem) => (
        <li key={todoItem.id}>{todoItem.title}</li>
      ))}
    </div>
  )
}

export default App
