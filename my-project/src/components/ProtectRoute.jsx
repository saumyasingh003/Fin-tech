import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // get user
  // const getUser = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const res = await axios.get(
  //       // "http://localhost:8080/api/users",
  //       {
  //         token: localStorage.getItem("token"),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (res.data.success) {
  //       dispatch(setUser(res.data.data));
  //     } else {
  //       // Use Navigate to redirect to the login page
  //       return <Navigate to="/login" replace />;
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (!user) {
  //     getUser();
  //   }
  // }, []);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
