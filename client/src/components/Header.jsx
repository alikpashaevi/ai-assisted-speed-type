import React from 'react'
import './Header.css'

//icons 
import { FaKeyboard, FaUser  } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Header = () => {
  return (
    <header>
      <h1><a href="/">EleTypes</a><FaKeyboard /></h1>
      <div className="header-logs">
        <a href="/profile"><FaUser /></a>
        <button className='log-out-btn'><FaArrowRightFromBracket /></button>
      </div>
    </header>
  )
}

export default Header