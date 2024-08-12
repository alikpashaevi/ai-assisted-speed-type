import React from 'react'
import './LoginForm.css'

const LoginForm = () => {
  return (
    <form className='login-form'>
      <input className='login-input' type="text" placeholder="Username" />
      <input className='password-input' type="password" placeholder="Password" />
      <button className='login-btn'>Login</button>
    </form>
  )
}

export default LoginForm