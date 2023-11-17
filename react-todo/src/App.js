import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const key = "savedTodoList";

  // Updated the default state for todoList to be an empty Array
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: JSON.parse(localStorage.getItem(key)) || [] } });
      }, 2000);
    });

    fetchData.then((result) => {
      setTodoList(result.data.todoList);
      setLoading(false); // Set isLoading to false after data fetch is complete
    });
  }, [key]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, { id: Date.now(), title: newTodo }]);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  useEffect(() => {
    // Add an if statement to check that isLoading is false before setting localStorage
    if (!loading) {
      localStorage.setItem(key, JSON.stringify(todoList));
    }
  }, [key, loading, todoList]);

  return (
    <div>
      <h1>Todo List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </div>
  );
}

export default App;
