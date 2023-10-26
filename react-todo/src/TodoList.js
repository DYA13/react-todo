import React from "react"
import TodoListItem from "./TodoListItem"
//Step 3: Add props as a parameter to the TodoList component
function TodoList(props) {
  // Step 4: Change todoList to reference props instead of the hard-coded variable
  const todoList = props.todoList

  return (
    <ul>
      {todoList.map((todoItem) => (
        <TodoListItem key={todoItem.id} todo={todoItem} />
      ))}
    </ul>
  )
}

export default TodoList
