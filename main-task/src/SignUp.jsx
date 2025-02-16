import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {UserContext} from './UserContext';
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const {addUser} = useContext(UserContext);
  const goToLogInPage = () =>{
    navigate('/LogIn');
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Form data
    console.log(`the name is ${data.name}`);
    addUser(data);
    alert("Signup successfully!");
    goToLogInPage();
  };

  return (
    <>
    <div className="form-container">
      <h2 className="heading">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="aligns">

        <div className="form-group">
          <div className="labels">
          <label htmlFor="name">Name</label>
          </div>
          <input type="text" id="name" placeholder="Enter the Name" {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters", },  })}/>
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <div className="labels">
          <label htmlFor="email">Email</label>
          </div>
          <input type="email" id="email" placeholder="Enter the Email" {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address", },})} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <div className="labels"> 
          <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password" placeholder="Enter the Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <div className="labels">
          <label htmlFor="phone">Phone Number</label>
          </div>
          <input
            type="tel"
            id="phone" placeholder="Enter the Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number (10 digits required)",
              },
            })}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
            <div className="btn-div">
                <button className="btn" type="submit">Sign Up</button>
            </div>
      </div>
      </form>
    </div>
    </>
  );
};

export default SignUp;