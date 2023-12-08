import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"

function App() {
  const key = "savedTodoList"

  // Step 1: Create a state variable for todoList
  const [todoList, setTodoList] = useState([])
  const [loading, setLoading] = useState(true)

  // Step 2: Declare the addTodo function
  const addTodo = (newTodo) => {
    // Step 2: Use the spread operator to update todoList with a new todo
    setTodoList([...todoList, { id: Date.now(), title: newTodo }])
  }

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(updatedTodoList)
  }

  useEffect(() => {
    const fetchData = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: { todoList: JSON.parse(localStorage.getItem(key)) || [] }
        })
      }, 2000)
    })

    fetchData.then((result) => {
      setTodoList(result.data.todoList)
      setLoading(false)
    })
  }, [key])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(key, JSON.stringify(todoList))
    }
  }, [key, loading, todoList])

  return (
    <div>
      <h1>Todo List</h1>
      {/* Step 3: Pass the addTodo function as a prop to AddTodoForm */}
      <AddTodoForm onAddTodo={addTodo} />
      {/* Step 2: Pass todoList and onRemoveTodo as props to TodoList */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </div>
  )
}

export default App
