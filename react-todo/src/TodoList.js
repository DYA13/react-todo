import React from "react"
import TodoListItem from "./TodoListItem"

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map((todoItem) => (
        <TodoListItem
          key={todoItem.id}
          todo={todoItem}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  )
}

export default TodoList
