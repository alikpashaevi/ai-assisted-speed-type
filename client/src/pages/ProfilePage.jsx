import React from 'react'
import Header from '../components/Header'
import Usercard from '../components/profile/UserCard'
import './ProfilePage.css'
import Elebot from '../components/profile/Elebot'
import Progress from '../components/profile/Progress'

const ProfilePage = () => {
  return (
    <main className='profile-page-main'>
      <Header />
      <div className="profile-page">
        <Usercard />
        <div className="others-div">
          <Elebot />
          <Progress />
        </div>
      </div>
    </main>
  )
}

export default ProfilePage