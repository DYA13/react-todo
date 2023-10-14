import React from "react"
import TodoListItem from "./TodoListItem"

function TodoList() {
  const todoList = [
    { id: 1, title: "Complete assignment" },
    { id: 2, title: "Review course materials" },
    { id: 3, title: "Submit project proposal" }
  ]

  return (
    <ul>
      {todoList.map((todoItem) => (
        <TodoListItem key={todoItem.id} todo={todoItem} />
      ))}
    </ul>
  )
}

export default TodoList
