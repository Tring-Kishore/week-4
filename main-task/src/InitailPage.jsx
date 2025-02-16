import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './tringapps-copy-2.png'
import LogIn from './LogIn';
import './InitailPage.css'
const InitailPage = () => {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate('/LogIn');
    }
    const handleSignUp = ()=>{
        navigate('/SignUp');
    }
  return (
    <>
      <header>
        <div className="header">
          <img src={logo} className='logo' alt="logo" />
          <div>
          <button onClick={handleSignIn} className='signin-btn'>Sign In</button>
          <button onClick={handleSignUp} className='signin-btn'>Sign Up</button>
          </div>
        </div>
        <div className='main'>Welcome to the Tringapps</div>
      </header>
    </>
  );
};

export default InitailPage;