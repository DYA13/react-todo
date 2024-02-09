import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import TodoContainer from "./components/TodoContainer"
import Chart from "./components/Chart"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TodoContainer />} />
        <Route
          path='/new'
          element={
            <>
              <Chart />
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
