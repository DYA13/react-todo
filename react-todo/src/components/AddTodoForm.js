import React, { useState } from "react"
import PropTypes from "prop-types"
import InputWithLabel from "./InputWithLabel"
import style from "./App.module.css"

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("")

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value
    setTodoTitle(newTodoTitle)
  }

  const handleAddTodo = (event) => {
    event.preventDefault()
    if (todoTitle === "") {
      return
    }
    onAddTodo(todoTitle)
    setTodoTitle("")
  }

  return (
    <form className={style.form} onSubmit={handleAddTodo}>
      <InputWithLabel
        id='todoTitle'
        value={todoTitle}
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      ></InputWithLabel>
      <button className={style.addBtn} type='submit'>
        Add Todo
      </button>
    </form>
  )
}
AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func
}

export default AddTodoForm
