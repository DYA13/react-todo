import React from "react"
import TodoListItem from "./TodoListItem"
import style from "./App.module.css"

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <>
      <ul className={style.todoList}>
        {todoList.map((todo) => {
          return (
            <TodoListItem
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

export default TodoList
