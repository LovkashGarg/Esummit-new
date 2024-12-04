'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddUser from "../components/AddUser"; // Adjust the path based on your folder structure
import RoleManagement from "../components/RoleManagement";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import InfinityLoader from "../components/infinite_loader";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0); // To store the total number of transactions
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const transactionsPerPage = 10; // Number of transactions per page
  const [totalPages,setTotalPages ]=useState(1);
  const [verificationStatus, setVerificationStatus] = useState('');
  const {data: session}= useSession();
  const [isAdmin,setIsAdmin]=useState(false)
  const router=useRouter();
  const [sessionUser,setSessionUser]=useState(null)

  const [loading, setLoading] = useState(true);
  
  // Simulate a data fetch with a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timeout
  }, []);
  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('jwtToken');

    const checkRole=()=>{
    // Check if JWT token exists for admin sign-in
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode JWT token
        setSessionUser(decodedToken); // Set user data from JWT
        setIsAdmin(decodedToken?.role !== "user"); // Check if the user is an admin
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    } 
    else if (session) {

      console.log("Session is being reached", session?.user?.role)
      // If session is available, check the user's role
      
      setSessionUser(session?.user)
      setIsAdmin(session?.user?.role !== 'user')
      console.log(isAdmin)
    } 
    else{
      console.log('Token issue')
      toast.error('Token is not available')
      setIsAdmin(false)
    }
    setLoading(false)
  };

  if((session !== undefined )|| token)
  {
    checkRole();
  }
  }, [session]);
  // Fetch transactions


  useEffect(() => {
    if(!loading && !isAdmin)
    {
      router.push('/')
    }
  }, [loading, isAdmin]);

  useEffect(() => {
    
    fetchTransactions();
  }, [currentPage,verificationStatus,]);

  const fetchTransactions = async (queryParams = {}) => {
    try {
      // Prepare the query string with pagination parameters
      const query = new URLSearchParams({
        ...queryParams,
        page: currentPage,
        limit: transactionsPerPage,
        verificationStatus,
      }).toString();
  
      // Make the API request
      const response = await fetch(`/api/transaction/create-transaction?${query}`);
  
      // Check if the response is okay
      if (!response.ok) {
        const errorText = await response.json();
        console.log(errorText.error);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText.error}`);
      }
  
      // Check if response body is empty or malformed
      const data = await response.json();
      if (!data || !data.transactions || !data.total) {
        throw new Error('Invalid response data or missing pagination info');
      }
  
      // Assuming API returns a `transactions` array and a `total` count
      setTransactions(data.transactions);
      setTotalTransactions(data.total);
  
      // If your API response also includes `totalPages`, you can set it for pagination
      if (data.totalPages) {
        setTotalPages(data.totalPages);
      } else {
        // If `totalPages` is not available, calculate based on total count and transactionsPerPage
        setTotalPages(Math.ceil(data.total / transactionsPerPage));
      }
      
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSearch = () => {
    const queryParams = {};
    if (filterType && searchTerm) {
      queryParams[filterType] = searchTerm;
    }
    if (verificationStatus) {
      queryParams.verificationStatus = verificationStatus; // Add verification filter
    }
    fetchTransactions(queryParams);
  };

  const handleVerify = async (transactionId) => {
    try {
      const response = await fetch(`/api/transaction/create-transaction`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId }),
      });

      if (!response.ok) {
        const errorText = await response.json();
        console.log(errorText.error);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText.error}`);
      }

      toast.success('Transaction verified');
      fetchTransactions(); // Refresh the transactions after verification
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      const response = await fetch(`/api/transaction/create-transaction`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId }),
      });

      if (!response.ok) {
        const errorText = await response.json();
        console.log(errorText.error);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText.error}`);
      }

      toast.success('Transaction deleted');
      fetchTransactions(); // Refresh the transactions after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalTransactions / transactionsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
     {loading ? (
      <InfinityLoader /> // Show loader while loading
    ) : (
      <div className="bg-black">
    <Navbar/>
    <div className="container mx-auto mt-32">
  <ToastContainer />
  <RoleManagement />
  {/* Button to toggle AddUser component */}
<button
  onClick={() => setShowAddUser((prev) => !prev)}
  className="bg-green-500 my-6  dark:bg-green-600 text-white px-6 py-3 rounded-full mb-4 hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105"
>
  {showAddUser ? "Hide Add User" : "Add New User"}
</button>

{/* Conditionally rendered AddUser component with a card style */}
{showAddUser && (
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 max-w-lg mx-auto mt-6">
    <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
      Add New User
    </h2>
    <AddUser />
  </div>
)}
  <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
  Transactions
  </h1>
  {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}

  {/* Search Bar */}
{/* Search Bar */}
<div className="flex items-center gap-4 mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md">
  <input
    type="text"
    placeholder="Search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Filter By</option>
    <option value="event">Event</option>
    <option value="eventPass">Event Pass</option>
    <option value="username">Username</option>
    <option value="transactionId">Transaction ID</option>
  </select>
  <select
  value={verificationStatus}
    onChange={(e) => setVerificationStatus( e.target.value )}
    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">All Transactions</option>
    <option value="verified">Verified</option>
    <option value="unverified">Unverified</option>
  </select>
  <button
    onClick={handleSearch}
    className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    Search
  </button>
</div>



  {/* Table Section */}
  <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4">
    <table className="min-w-full border border-gray-200 dark:border-gray-700">
      <thead className="bg-gray-200 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Transaction ID
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Amount
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Event
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Date
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Verification Status
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Actions
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            Contact Number
          </th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {transactions.map((transaction) => (
          <tr
            key={transaction.transactionId}
            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <td className="px-6 py-3">{transaction.transactionId}</td>
            <td className="px-6 py-3">{transaction.name}</td>
            <td className="px-6 py-3">{transaction.amount}</td>
            <td className="px-6 py-3">{transaction.eventNames.join(", ")}</td>
            <td className="px-6 py-3">
              {new Date(transaction.date).toLocaleDateString()}
            </td>
            <td className="px-6 py-3">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  transaction.verificationStatus === "verified"
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    : "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100"
                }`}
              >
                {transaction.verificationStatus}
              </span>
            </td>
            <td className="  px-6 py-3 space-y-2">
              {transaction.verificationStatus === "unverified" && (
                <button
                  onClick={() => handleVerify(transaction.transactionId)}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Verify
                </button>
              )}
              <button
                onClick={() =>handleDelete(transaction.transactionId)}
                className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete
              </button>
            </td>
            <td className="px-6 py-3">{transaction.email}</td>
            <td className="px-6 py-3">{transaction.contactNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination Controls */}
  <div className="flex justify-between items-center mt-4 px-4">
    <button
      onClick={handlePreviousPage}
      disabled={currentPage === 1}
      className="bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-300 px-6 py-2 rounded disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      Previous
    </button>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Page {currentPage} of {Math.ceil(totalTransactions / transactionsPerPage)}
    </p>
    <button
      onClick={handleNextPage}
      disabled={currentPage === Math.ceil(totalTransactions / transactionsPerPage)}
      className="bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-300 px-6 py-2 rounded disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      Next
    </button>
  </div>

  {/* Total Transactions Count */}
  <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
    Total Transactions: <strong>{totalTransactions}</strong>
  </p>
 </div>
</div>
  )}
</>
  );
}
