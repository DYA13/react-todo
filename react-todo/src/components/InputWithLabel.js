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
      <label className={style.label} htmlFor={id}>
        {children}{" "}
      </label>
      <input
        className={style.input}
        id={id}
        type={type}
        value={value}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  )
}
InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleTitleChange: PropTypes.func
}
export default InputWithLabel
