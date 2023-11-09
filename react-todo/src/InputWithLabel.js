import React, { useRef, useEffect } from "react"

const InputWithLabel = (props) => {
  const inputRef = useRef(null) // Create a ref

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })
  return (
    <>
      <label htmlFor='title'>{props.children}:</label>
      <input
        type='text'
        name='title'
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        ref={inputRef}
      />
    </>
  )
}

export default InputWithLabel
