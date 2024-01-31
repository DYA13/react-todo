import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"
import style from "./App.module.css"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState("asc")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const airtableUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
  const airtableToken = process.env.REACT_APP_AIRTABLE_API_TOKEN

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${airtableToken}`
      }
    }

    try {
      let apiUrl = `${airtableUrl}?view=Grid%20view&sort[0][field]=createdTime&sort[0][direction]=${sortOrder}`

      // Add filtering parameters if start and end dates are provided
      if (startDate && endDate) {
        apiUrl += `&filterByFormula=AND(createdTime >= '${startDate}T00:00:00Z', createdTime <= '${endDate}T23:59:59Z')`
      }

      const response = await fetch(apiUrl, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
        createdTime: new Date(record.createdTime)
      }))

      // Sort based on title
      todos.sort((a, b) => {
        const titleA = a.title.toUpperCase()
        const titleB = b.title.toUpperCase()

        if (titleA < titleB) {
          return sortOrder === "asc" ? -1 : 1
        }
        if (titleA > titleB) {
          return sortOrder === "asc" ? 1 : -1
        }
        return 0
      })

      setTodoList(todos)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error.message)
    }
  }

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newSortOrder)
  }

  const addTodo = async (newTodo) => {
    const title = {
      fields: {
        title: newTodo
      }
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${airtableToken}`
      },
      body: JSON.stringify(title)
    }

    try {
      const response = await fetch(airtableUrl, options)

      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`)
      }

      const todo = await response.json()
      const newTodoItem = { id: todo.id, title: todo.fields.title }
      setTodoList([...todoList, newTodoItem])
      fetchData()
    } catch (error) {
      console.log(error.message)
      return
    }
  }

  const removeTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${airtableToken}`
      }
    }

    try {
      const response = await fetch(`${airtableUrl}/${id}`, options)

      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`)
      }

      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => id !== todo.id)
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder])

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  const fetchDataWithFilter = () => {
    fetchData()
  }

  return (
    <>
      <h1 className={style.h1}>To Do List</h1>

      <AddTodoForm onAddTodo={addTodo} />
      {loading ? (
        <p className={style.loading}>Loading ...</p>
      ) : (
        <div className={style.container}>
          <div className={style.containerSortFilter}>
            {/* Sorting */}
            <div
              className={`${style.sortContainer} ${
                sortOrder === "asc" ? style.sortAsc : style.sortDesc
              }`}
            >
              <button className={style.sortBtn} onClick={toggleSortOrder}>
                {sortOrder === "asc" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </button>
            </div>
            {/* Divider Line */}
            <div className={style.divider}></div>
            {/* Filtering */}
            <div className={style.filterContainer}>
              <label className={style.labelFilter}>Filter by Date: </label>
              <input
                className={style.dateInput}
                type='date'
                value={startDate || ""}
                onChange={(e) => handleStartDateChange(e.target.value)}
              />
              <span className={style.spanFilter}> to</span>
              <input
                className={style.dateInput}
                type='date'
                value={endDate || ""}
                onChange={(e) => handleEndDateChange(e.target.value)}
              />
              <button className={style.filterBtn} onClick={fetchDataWithFilter}>
                Apply
              </button>
            </div>
          </div>
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </div>
      )}
    </>
  )
}

export default TodoContainer
