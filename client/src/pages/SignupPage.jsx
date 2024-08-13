import React, { Fragment } from 'react'
import Header from '../components/Header'
import { FaGoogle } from "react-icons/fa6";
import './SignupPage.css'
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

export const SignupPage = () => {
  return (
    
      <main>
        <Header />
        <div className='signup-container'>
          <h1 className='signup-title'>Sign up</h1>
          <div className="oauth-signup">
            <p>Sign Up with Google: </p> <a href="/"><FaGoogle /></a>
          </div>
          <div className="orwithline">
            <div className="line"></div>
            <div className='text'>or</div>
            <div className="line"></div>
          </div>
          <SignupForm />
          <div className="signup-div">
            <p className='no-account-text'>Already have an account?</p><Link to="/login">Login</Link>
          </div>
        </div>
      </main>
    
  )
}
