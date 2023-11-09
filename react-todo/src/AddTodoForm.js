import React, { useState } from "react"
import InputWithLabel from "./InputWithLabel"
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
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        label='Title'
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      />
      <button type='submit'>Add Todo</button>
    </form>
  )
}

export default AddTodoForm
