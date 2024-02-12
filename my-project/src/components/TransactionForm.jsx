import React, { useState } from "react";
import axios from "axios";
import { post } from "../api/api_helper";

const TransactionForm = () => {
  const userId = localStorage.getItem('userId')
  const [formData, setFormData] = useState({
    userId:`${userId}`,
    type: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post("/transactions", formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" overflow-y-hidden">
      <h1 className="text-3xl  font-extrabold  font-sarif    text-[#283618] mb-10 mt-10 ">
        Your Personnal Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 bg-[#606C38] rounded-lg p-10 mb-10"
      >
        <input
          type="text"
          name="type"
          placeholder="Type (income/expense)"
          value={formData.type}
          onChange={handleChange}
          className="bg-marine text-black placeholder-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="bg-marine text-black placeholder-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="bg-marine text-black placeholder-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          className="bg-marine text-black placeholder-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <button
          type="submit"
          className="bg-[#BC6C25]  text-black rounded-lg px-4 py-2"
        >
          Submit
        </button>
      </form>
      

    </div>
  );
};

export default TransactionForm;
