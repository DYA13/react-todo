import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"

function App() {
  const key = "savedTodoList"
  const initialState = []
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem(key)) || initialState
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todoList))
  }, [key, todoList])
  const addTodo = (newTodo) => {
    setTodoList([...todoList, { id: Date.now(), title: newTodo }])
  }

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(updatedTodoList)
  }
  return (
    <div>
      <h1>Todo List</h1>
      <>
        <AddTodoForm onAddTodo={addTodo} />

        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      </>
    </div>
  )
}

export default App
