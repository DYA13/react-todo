import React from "react"
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
export default InputWithLabel
