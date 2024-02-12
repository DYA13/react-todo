import React from "react"
import PropTypes from "prop-types"
import style from "./App.module.css"
import { TiDeleteOutline } from "react-icons/ti"

const TodoListItem = ({ todo, onRemoveTodo, index }) => {
  return (
    <div className={style.card}>
      <li className={style.listItem}>
        {/* Display the title of the todo */}
        <span className={style.itemNumber}>{index + 1}</span>
        <p className={style.card__content}>{todo.title}</p>
        {/* Display the status */}
        {todo.status && <p className={style.status}>Status: {todo.status}</p>}
        {/* Display the creation time if it's defined */}
        {todo.createdTime && (
          <p className={style.createdTime}>
            Created at: {todo.createdTime.toLocaleString()}
          </p>
        )}
        <button
          className={style.removeBtn}
          type='button'
          onClick={() => onRemoveTodo(todo.id)}
        >
          <TiDeleteOutline size={25} />
        </button>
      </li>
    </div>
  )
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    createdTime: PropTypes.instanceOf(Date) // Assuming createdTime is a Date object
  }),
  onRemoveTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

export default TodoListItem
