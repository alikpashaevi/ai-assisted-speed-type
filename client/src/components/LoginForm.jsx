import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For displaying messages to the user
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data);
        
        // Handle successful login, e.g., redirect or show a success message
        console.log('Login successful');
        if (response.ok) {
          localStorage.setItem('token', data.accessToken); // Store the token
          navigate('/profile'); // Redirect to the ProfilePage
          }
      } else {
        setMessage('Invalid username or password');
        console.log('Login failed');
      }
    } catch (err) {
      console.error(err.message);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <input
        className='login-input'
        name='username'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='password-input'
        name='password'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='login-btn'>Login</button>
      {message && <p>{message}</p>} {/* Display the message to the user */}
    </form>
  );
};

export default LoginForm;
