import React from "react"
import style from "./App.module.css"

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <>
      <li className={style.listItem}>
        {/* Display the title of the todo */}
        {todo.title}
        <button
          className={style.removeBtn}
          type='button'
          onClick={() => onRemoveTodo(todo.id)}
        >
          Remove
        </button>
      </li>
    </>
  )
}

export default TodoListItem
