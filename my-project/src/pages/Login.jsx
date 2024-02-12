import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { get, post } from "../api/api_helper";
import { ToastContainer, toast } from 'react-toastify';
import { showLoading ,hideLoading } from '../redux/features/alertSlice';
import {useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  let [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  let handleInputChange = (event) => {
   
    setFormdata((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };
  let handleSubmit = async(event) => {
   
    event.preventDefault();
    console.log(formdata);
    try{
      dispatch(showLoading());
      const data = await post('/login', formdata)
      console.log(data)
      localStorage.setItem('userId', data.user._id)
      dispatch(hideLoading());
      toast.success("User logged In successfully!")
        navigate("/")
      const token = localStorage.setItem('token', data.token)
      const username = localStorage.setItem('username', data.user.username) 
     
    }catch(error){
      dispatch(hideLoading());
      toast.error("error ocurred!")
      console.error(error)
    }
  };
  return (
    <div className=" flex justify-center w-screen">
    <ToastContainer/>
      <div
        className="sm:w-[25vw] h-fit max-w-md p-8 space-y-3  rounded-3xl justify-center
        shadow-xl shadow-gray-100 dark:text-gray-100"
        style={{ fontFamily: " 'Bricolage Grotesque', sans-serif" }}
      >
      
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form
          noValidate=""
          action=""
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1 text-sm ">
            {/* <label for="firstname" className="block dark:text-gray-400">
      First Name
    </label> */}
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleInputChange}
              value={formdata.username}
              placeholder="User Name"
              className="sm:w-[20vw] px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm">
            {/* <label for="password" className="block dark-text-gray-400">
      Password
    </label>  */}
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              value={formdata.password}
              placeholder="Password"
              className="sm:w-[20vw] px-4  mb-2 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>

          <button className="block sm:w-[20vw] p-3 text-center  bg-green-500  rounded-md  dark:text-gray-900 ">
            Login
          </button>
        </form>

        <p className="text-xs text-center sm:px-6  ">
          Not a user?
          <a
            rel="noopener noreferrer"
            href="/Register"
            className="underline ml-4 dark:text-gray-100"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login