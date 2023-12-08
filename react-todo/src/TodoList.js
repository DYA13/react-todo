import React from "react"
import TodoListItem from "./TodoListItem"

function TodoList({ todoList, onRemoveTodo }) {
  console.log("TodoList Component - todoList:", todoList)
  return (
    <>
      <ul>
        {todoList.map((todo) => {
          console.log("Todo object:", todo)

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
