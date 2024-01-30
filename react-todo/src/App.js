import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import TodoContainer from "./components/TodoContainer"
import style from "./components/App.module.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TodoContainer />} />
        <Route
          path='/new'
          element={
            <>
              <h1 className={style.h1}>New Todo List</h1>
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
