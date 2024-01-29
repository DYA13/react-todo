import React from "react"
import PropTypes from "prop-types"
import TodoListItem from "./TodoListItem"
import style from "./App.module.css"

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <>
      <ul className={style.todoList}>
        {todoList.map((todo, index) => {
          return (
            <TodoListItem
              index={index}
              key={todo.id}
              todo={todo}
              onRemoveTodo={onRemoveTodo}
            />
          )
        })}
      </ul>
    </>
  )
}
TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  index: PropTypes.number
}

export default TodoList
