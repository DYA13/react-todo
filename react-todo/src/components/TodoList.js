import React from "react"
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

export default TodoList
