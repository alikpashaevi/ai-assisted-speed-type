import React from 'react'
import Header from '../components/Header'
import Usercard from '../components/profile/UserCard'
import './ProfilePage.css'
import Elebot from '../components/profile/Elebot'
import Progress from '../components/profile/Progress'
import { useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const ProfilePage = () => {
  const [chartData, setChartData] = useState( {
    labels: ['2016', '2017', '2018', '2019', '2020'], // Labels for the x-axis
    datasets: [
      {
        label: 'WPM',
        data: [60, 90, 80, 93, 87, 98, 85], // Data for the y-axis
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  });

  return (
    <main className='profile-page-main'>
      <Header />
      <div className="profile-page">
        <Usercard />
        <div className="others-div">
          <Elebot />
          <Progress chartData={chartData} />
        </div>
      </div>
    </main>
  )
}

export default ProfilePage