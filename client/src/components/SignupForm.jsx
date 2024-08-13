import React, { useState } from 'react'
import './SignupForm.css'

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      })
      
      const data = await response.text();
      setMessage(data);
      console.log(data);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <input className='signup-input' name='username' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value) } />
      <input className='password-input' name='password' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className='password-input' name='confirmPassword' type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      {message && <p>{message}</p>}
      <button className='signup-btn'>Sign Up</button>
    </form>
  )
}

export default SignupForm