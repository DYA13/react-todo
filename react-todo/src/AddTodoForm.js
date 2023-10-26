import React, { useState } from "react"

const AddTodoForm = (props) => {
  // Step 1: Create a state variable for the input value
  const [todoTitle, setTodoTitle] = useState("") // Step 3: Use the todoTitle state as the value prop

  // Step 4: Declare the handleTitleChange function
  const handleTitleChange = (event) => {
    // Retrieve the input value from the event object and update the state
    const newTodoTitle = event.target.value
    setTodoTitle(newTodoTitle)
  }

  const handleAddTodo = (event) => {
    event.preventDefault()

    // Step 5: Update onAddTodo to use the todoTitle state
    props.onAddTodo(todoTitle)

    event.target.reset()
  }

  return (
    <form onSubmit={handleAddTodo}>
      {/* Step 2: Modify the input to be a controlled input */}
      <input
        type='text'
        name='title'
        value={todoTitle} // Step 3: Use the todoTitle state as the value prop
        onChange={handleTitleChange} // Step 3: Use handleTitleChange for onChange
      />
      <button type='submit'>Add Todo</button>
    </form>
  )
}

export default AddTodoForm
