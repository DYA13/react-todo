import React, { useState } from "react"

const AddTodoForm = (props) => {
  const [title, setTitle] = useState("")

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAddTodo = (event) => {
    event.preventDefault()

    const todoTitle = event.target.elements.title.value // Retrieve the value of the title input field
    console.log(todoTitle)

    props.onAddTodo(todoTitle)
    event.target.reset() // Reset the form to clear the text input
  }
  return (
    <form onSubmit={handleAddTodo}>
      <input
        type='text'
        name='title'
        value={title}
        onChange={handleTitleChange}
      />
      <button type='submit'>Add Todo</button>
    </form>
  )
}
export default AddTodoForm
