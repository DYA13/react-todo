import React, { useState, useEffect } from "react"
import TodoList from "./TodoList"
import AddTodoForm from "./AddTodoForm"
import style from "./App.module.css"
const TodoContainer = () => {
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
      const response = await fetch(airtableUrl, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      const todos = data.records.map((record) => {
        return { id: record.id, title: record.fields.title }
      })

      setTodoList(todos)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error.message)
    }
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
  }, [])

  return (
    <>
      <h1 className={style.h1}>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {loading ? (
        <p className={style.loading}>Loading ...</p>
      ) : (
        <div className={style.container}>
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </div>
      )}
    </>
  )
}

export default TodoContainer
