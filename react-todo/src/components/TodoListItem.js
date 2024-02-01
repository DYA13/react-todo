import React from "react"
import PropTypes from "prop-types"
import style from "./App.module.css"
import { TiDeleteOutline } from "react-icons/ti"

const TodoListItem = ({ todo, onRemoveTodo, index }) => {
  return (
    <>
      <li className={style.listItem}>
        {/* Display the title of the todo */}
        <span className={style.itemNumber}>{index + 1}</span>
        <p className={style.card__content}> {todo.title}</p>

        <button
          className={style.removeBtn}
          type='button'
          onClick={() => onRemoveTodo(todo.id)}
        >
          <TiDeleteOutline size={25} />
        </button>
      </li>
    </>
  )
}
TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default TodoListItem
