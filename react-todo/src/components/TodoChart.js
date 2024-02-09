import React, { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

const TodoChart = ({ todoList }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const statusCounts = {}

    todoList.forEach((todo) => {
      const status = todo.status
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    const labels = Object.keys(statusCounts)
    const data = Object.values(statusCounts)

    const ctx = chartRef.current.getContext("2d")

    // Destroy existing chart instance
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.destroy()
    }

    // Create new chart instance
    chartRef.current.chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)", // Bright pink
              "rgba(75, 192, 192, 0.5)", // Bright teal
              "rgba(255, 205, 86, 0.5)" // Bright yellow
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 205, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        cutout: "40%" // Set the cutout percentage to make it smaller
      }
    })
  }, [todoList])

  return (
    <div style={{ width: "450px", height: "450px", margin: "40px" }}>
      <canvas ref={chartRef} width='250' height='250'></canvas>
    </div>
  )
}

export default TodoChart
