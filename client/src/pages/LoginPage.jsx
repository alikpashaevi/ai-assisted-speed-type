import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm'
import Header from '../components/Header'
import { FaGoogle } from "react-icons/fa6";
import './LoginPage.css'

export const LoginPage = () => {
  return (
    <main>
      <Header />
      <div className='login-container'>
        <h1 className='login-title'>Login</h1>
        <div className="oauth-login">
          <p>Login with Google: </p> <a href="/"><FaGoogle /></a>
        </div>
        <div className="orwithline">
          <div className="line"></div>
          <div className='text'>or</div>
          <div className="line"></div>
        </div>
        <LoginForm />
        <div className="signup-div">
          <p className='no-account-text'>don't have an account?</p><Link to="/register">Sign up</Link>
        </div>
      </div>
    </main>
  )
}
