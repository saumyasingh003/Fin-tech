import React, { useState, useEffect } from "react";
import { get } from "../api/api_helper";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await get("/getTransactions");
        setTransactions(response.transactions);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTransactions();
  }, []);
  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
  }

  return (
    <div className="relative max-[768px]:right-12 max-[768px]:top-10">
      <h1 className="lg:text-3xl text-2xl font-bold font-sans  text-[#283618] mb-10 mt-10 text-center lg:ml-60 lg:w-[56rem] ">
        Recent Transactions
      </h1>
      
      <div class="flex flex-col">
        <div class=" ">
          <div class="p-1.5  ">
            <div class="lg:ml-72 overflow-x-auto max-[768px]:w-72">
              <table class="lg:w-[56rem] table-auto overflow-x-auto divide-y divide-gray-200 dark:divide-gray-700 ">
                <thead className="bg-[#cd8443]">
                  <tr className="text-white">
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium  uppercase"
                    >
                      Sr.No
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium  uppercase"
                    >
                    UserName
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium uppercase"
                    >
                    Category
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-end text-xs font-medium  uppercase"
                    >
                    Amount
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-end text-xs font-medium  uppercase"
                    >
                   Type
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-end text-xs font-medium  uppercase"
                    >
                   Date
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 ">  
                {transactions.map((transaction, index) => {
                  const formattedDate = formatDate(transaction.date)
                  return(

                  <tr key={index}>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {index + 1}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {username}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {transaction.category}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    &#8377;{transaction.amount}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    {transaction.type}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    {formattedDate}
                    </td>
                  </tr>
                  )
                }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
