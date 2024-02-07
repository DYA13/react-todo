import React from "react"
import PropTypes from "prop-types"
import style from "./App.module.css"

function InputWithLabel({
  id,
  type = "text",
  children,
  value,
  handleTitleChange
}) {
  const inputRef = React.useRef()

  React.useEffect(() => {
    inputRef.current.focus()
  })
  return (
    <>
      <label className={style.inputTitleText} htmlFor={id}>
        {children}{" "}
      </label>
      <input
        className={style.inputTitle}
        id={id}
        type={type}
        value={value}
        onChange={handleTitleChange}
        ref={inputRef}
        placeholder='Add your task'
      />
    </>
  )
}
InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func
}
export default InputWithLabel
