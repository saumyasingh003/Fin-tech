import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectRoute";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import TransactionForm from "./components/TransactionForm";
import Transactions from "./components/Transactions";
import './App.css'
import Landing from "./components/Landing";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
          <Route path="home" element={<ProtectedRoute><Landing /></ProtectedRoute>}/>
          <Route path="transactions" element={<ProtectedRoute><TransactionForm /></ProtectedRoute>}/>
          <Route path="summary" element={<ProtectedRoute><Transactions /></ProtectedRoute>}/>
        </Route>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
