import React from 'react'
import './SignupForm.css'

const SignupForm = () => {
  return (
    <form className='signup-form'>
      <input className='signup-input' type="text" placeholder="Username" />
      <input className='password-input' type="password" placeholder="Password" />
      <input className='password-input' type="password" placeholder="Repeate Password" />
      <button className='signup-btn'>Sign Up</button>
    </form>
  )
}

export default SignupForm