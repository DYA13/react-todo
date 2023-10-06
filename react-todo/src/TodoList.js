import React from "react"

function TodoList() {
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Review course materials" },
    { id: 3, title: "Submit project proposal" }
  ]
  return (
    <ul>
      {todoList.map((todoItem) => (
        <li key={todoItem.id}>{todoItem.title}</li>
      ))}
    </ul>
  )
}
export default TodoList
