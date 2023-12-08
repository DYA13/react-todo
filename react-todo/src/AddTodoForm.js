import React, { useState } from "react"
import InputWithLabel from "./InputWithLabel"
const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("")

  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value
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
      <InputWithLabel
        id='todoTitle'
        value={todoTitle}
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button type='submit'>Add Todo</button>
    </form>
  )
}

export default AddTodoForm
