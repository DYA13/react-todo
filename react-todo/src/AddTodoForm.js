import React, { useState } from "react"

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("")

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value
    setTodoTitle(newTodoTitle)
  }

  const handleAddTodo = (event) => {
    event.preventDefault()
    onAddTodo(todoTitle)
    event.target.reset()
    setTodoTitle("")
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type='text'
        name='title'
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type='submit'>Add Todo</button>
    </form>
  )
}

export default AddTodoForm
