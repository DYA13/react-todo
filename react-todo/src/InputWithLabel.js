import React from "react"

const InputWithLabel = (props) => {
  return (
    <>
      <label htmlFor='title'>{props.children}:</label>
      <input
        type='text'
        name='title'
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      />
    </>
  )
}

export default InputWithLabel
