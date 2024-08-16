import React from 'react'
import { Line } from "react-chartjs-2";
import './Progress.css'

const Progress = ({chartData}) => {
  return (
    <div className='progress-container'>
      <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Your Progress</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Your typing speed progression so far"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
    </div>
  )
}

export default Progress