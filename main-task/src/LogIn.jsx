import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {UserContext} from './UserContext';
import Persona from './Persona';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LogIn = () => {
  const navigate = useNavigate();
  const {checkUser} = useContext(UserContext);

  const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const {register , handleSubmit , formState : {errors}, } = useForm();
  const goToPersona = () =>{
    navigate('/Persona');
  }

  // alert + navigation
  const alertForLogin = () => {
    toast.success('Login successful!', {
      position: "top-center",
      autoClose: 4000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    setTimeout(() => {
      goToPersona();
    }, 4000);
  };
  const errorInvalidData = () => {
    toast.error('Invalid email Or Password', {
      position: "top-center",
      autoClose: 4000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    const {email,password} = data;
    if(checkUser(email,password))
    {
      alertForLogin();
    }
    else
    {
      errorInvalidData();
    }
  }
  const goToSignUp = () =>{
    navigate('/SignUp');
  }
  return (
    <>

    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='heading'>Login Form</h2>
            <div className="form-group">
              <div className='labels'>
              <label htmlFor="email">Email</label>
              </div>
              <input type="email" id='email' placeholder='Enter the Email' {...register("email" , {required : "Email is required" , pattern : {value : validateEmail , message:"Email is Invalid"}, })}/>
              {errors.email && <p className='error'>{errors.email.message}</p>}
            </div>
            <div className="form-group">
              <div className='labels'>
              <label htmlFor="password">Password</label>
              </div>
              <input type="password" id='password' placeholder='Enter the Password' {...register("password" , {required : "Password is required" , minLength : {value : 6 , message : "Password must atleast 6 letters"},})} />
              {errors.password && <p className='error'>{errors.password.message}</p>}
            </div>
            <div className='btn-div'>
            <button className='btn' type='submit'>Login</button>
            </div>

            <p>Don't You Have an Account ? <button className='lastsignup' onClick={goToSignUp} style={{cursor:'pointer'}}>Sign Up</button></p>
        </form>
      </div>
    </div>
    <ToastContainer/>
  </>  
  )
}

export default LogIn