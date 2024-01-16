import React from "react"
import style from "./App.module.css"
import { FcEmptyTrash } from "react-icons/fc"
const TodoListItem = ({ todo, onRemoveTodo, index }) => {
  return (
    <>
      <li className={style.listItem}>
        {/* Display the title of the todo */}
        <span className={style.itemNumber}>{index + 1}</span>
        {todo.title}

        <button
          className={style.removeBtn}
          type='button'
          onClick={() => onRemoveTodo(todo.id)}
        >
          Remove
          <FcEmptyTrash size={25} />
        </button>
      </li>
    </>
  )
}

export default TodoListItem
