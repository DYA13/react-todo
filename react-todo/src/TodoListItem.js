import React from "react"

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <>
      <li>
        {/* Display the title of the todo */}
        {todo.title}
        <button type='button' onClick={() => onRemoveTodo(todo.id)}>
          Remove
        </button>
      </li>
    </>
  )
}

export default TodoListItem
