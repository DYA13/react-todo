import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"
import style from "./App.module.css"
import Select from "react-select"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState("asc")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectedStatusOptions, setSelectedStatusOptions] = useState([])

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

      // Add filtering parameters for start and end dates
      // Add filtering parameters for start and end dates
      if (startDate && endDate) {
        const formattedStartDate = startDate.toISOString()
        const formattedEndDate = endDate.toISOString()

        apiUrl += `&filterByFormula=AND(DATETIME_FORMAT(DATEADD(createdTime, -7, 'hours'), 'YYYY-MM-DD') >= '${formattedStartDate}', DATETIME_FORMAT(DATEADD(createdTime, -7, 'hours'), 'YYYY-MM-DD') <= '${formattedEndDate}')`
      }

      // Add filtering parameters for selected status options
      if (selectedStatusOptions.length > 0) {
        const statusFilter = selectedStatusOptions
          .map((status) => `{status} = '${status.value}'`)
          .join(",")
        apiUrl += `&filterByFormula=AND(${statusFilter})`
      }

      const response = await fetch(apiUrl, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
        createdTime: new Date(record.createdTime),
        status: record.fields.status
      }))

      // Sort based on title
      todos.sort((a, b) => {
        const titleA = a.title
        const titleB = b.title

        if (titleA < titleB) {
          return sortOrder === "asc" ? -1 : 1
        }
        if (titleA > titleB) {
          return sortOrder === "asc" ? 1 : -1
        }
        return titleA.localeCompare(titleB) * (sortOrder === "asc" ? 1 : -1)
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
    const todoData = {
      fields: {
        title: newTodo,
        status: selectedStatusOptions[1]?.value
      }
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${airtableToken}`
      },
      body: JSON.stringify(todoData)
    }

    try {
      const response = await fetch(airtableUrl, options)

      if (!response.ok) {
        throw new Error(`Error has occurred: ${response.status}`)
      }

      const todo = await response.json()

      const newTodoItem = {
        id: todo.id,
        title: todo.fields.title,
        status: todo.fields.status
      }

      setTodoList([...todoList, newTodoItem])

      fetchData()
    } catch (error) {
      console.log("Caught an error:", error.message)

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

  const handleStatusChange = (selectedOptions) => {
    setSelectedStatusOptions(selectedOptions)
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

            {/* Filtering by date*/}
            <div className={style.filterContainer}>
              <label className={style.labelFilter}>Filter by Date: </label>
              <ReactDatePicker
                className={style.dateInput}
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat='yyyy-MM-dd'
                placeholderText='Start Date'
              />
              <span className={style.spanFilter}> to</span>
              <ReactDatePicker
                className={style.dateInput}
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat='yyyy-MM-dd'
                placeholderText='End Date'
              />

              <button className={style.filterBtn} onClick={fetchDataWithFilter}>
                Apply
              </button>
            </div>
            {/* Divider Line */}
            <div className={style.divider}></div>
            <div className={style.filterContainer}>
              {/* Existing code... */}
              <label className={style.labelFilter}>Filter by Status: </label>
              <Select
                isMulti
                options={[
                  { value: "in progress", label: "in progress" },
                  { value: "completed", label: "completed" },
                  { value: "start work", label: "start work" }
                ]}
                value={selectedStatusOptions}
                onChange={handleStatusChange}
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
