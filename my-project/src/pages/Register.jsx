import React from "react";
import { useState } from "react";
import { get, post } from "../api/api_helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showLoading ,hideLoading } from '../redux/features/alertSlice';
import {useDispatch} from 'react-redux';

function Register() {
  const dispatch = useDispatch();
  let [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
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
    dispatch(showLoading());
    await post('/register', formdata).then((response)=>{
      console.log(response)
      toast.success(response.message)
      
    }).catch((err)=>{
      dispatch(hideLoading());
      toast.error("Error Occurred!")
      console.log(err)
    })


  };


  return (
    <div className=" flex justify-center mt-10">
      <div
        className="sm:w-[25vw] h-fit max-w-md p-8 space-y-3  rounded-3xl justify-center
        shadow-xl shadow-gray-100 dark:text-gray-100"
        style={{ fontFamily: " 'Bricolage Grotesque', sans-serif" }}
      >
        <h1 className="text-2xl font-bold text-center">Register Now</h1>
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
              name="firstName"
              id="firstName"
              onChange={handleInputChange}
              value={formdata.firstName}
              placeholder="First Name"
              className="sm:w-[20vw] px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm ">
            {/* <label for="lastname" className="block dark:text-gray-400">
      First Name
    </label> */}
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleInputChange}
              value={formdata.lastName}
              placeholder="Last Name"
              className="sm:w-[20vw] px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm ">
            {/* <label for="username" className="block dark:text-gray-400">
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
            {/* <label for="email" className="block dark:text-gray-400">
      Email
    </label> */}
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formdata.email}
              className="sm:w-[20vw] px-4 mb-2  py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
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
            Register
          </button>
        </form>

        <p className="text-xs text-center sm:px-6  ">
          Already have a Account?
          <a
            rel="noopener noreferrer"
            href="/Login"
            className="underline ml-4 dark:text-gray-100"
          >
            Login
          </a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Register;