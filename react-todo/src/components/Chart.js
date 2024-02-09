import React, { useState, useEffect } from "react"
import style from "./App.module.css"
import { Link } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css"
import TodoChart from "./TodoChart"

const Chart = () => {
  const [todoList, setTodoList] = useState([])
  const [loading, setLoading] = useState(true)

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
      const apiUrl = `${airtableUrl}?view=Grid%20view`

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

      setTodoList(todos)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error.message)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Link className={style.link} to='/'>
        Back to main page
      </Link>
      {loading ? (
        <p className={style.loading}>Loading ...</p>
      ) : (
        <div className={style.container}>
          <div className={style.containerSortFilter}></div>
          <h1 className={style.h1}>Chart on status </h1>
          <TodoChart todoList={todoList} />
        </div>
      )}
    </>
  )
}

export default Chart
