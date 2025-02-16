import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {UserContext} from './UserContext';
import Persona from './Persona';
import { useNavigate } from 'react-router-dom';
// import './LogIn.css'
const LogIn = () => {
  const navigate = useNavigate();
  const {checkUser} = useContext(UserContext);

  const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const {register , handleSubmit , formState : {errors}, } = useForm();
  const goToPersona = () =>{
    navigate('/Persona');
  }
  const onSubmit = (data) => {
    console.log(data);
    const {email,password} = data;
    if(checkUser(email,password))
    {
      alert("Login Successfully");
      goToPersona();
    }
    else
    {
      alert("Invalid email Or Password");
    }
  }
  return (
    <>

    <div>
      <div className="form-container">
      <h2 className='heading'>Login Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className='btn-div'>
            <button className='btn' type='submit'>Login</button>
            </div>
        </form>
      </div>
    </div>

  </>  
  )
}

export default LogIn