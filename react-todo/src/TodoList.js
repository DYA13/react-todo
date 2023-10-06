import React from "react"

function TodoList() {
  const todoList = []
  return (
    <ul>
      {todoList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
export default TodoList
