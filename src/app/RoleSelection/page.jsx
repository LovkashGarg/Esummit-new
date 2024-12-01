'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession, getProviders } from 'next-auth/react'; // Import necessary next-auth hooks
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const RoleSelection = () => {
  const [role, setRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedInAdmin, setLoggedInAdmin] = useState(false);
  const [providers, setProviders] = useState(null); // State to store providers
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle for password visibility
  const router = useRouter();

  useEffect(() => {
    // Redirect general user to home page if logged in
    if (status === 'authenticated' && !loggedInAdmin) {
      router.push('/home');
    }
  }, [status, loggedInAdmin, router]);
  
  useEffect(() => {
    // Fetch the available providers for the sign-in options
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setErrorMessage('');
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      const data = await response.json();

      if (response.ok) {
      
        localStorage.setItem('jwtToken', data.token); // Store JWT token
        alert('Admin login successful');
        setLoggedInAdmin(true);
      } else {
        setErrorMessage(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Internal server error. Please try again later.');
      console.error('Error during admin login:', error);
    }
  };

  return (
    
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      {role === null && !loggedInAdmin && (
        <>
          <h1 className="text-4xl font-bold text-blue-400 mb-12">Select Your Role</h1>
          <div className="flex gap-6">
            <button
              aria-label="Select User Role"
              className="px-8 py-4 text-xl font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-all transform hover:scale-105"
              onClick={() => handleRoleSelection('user')}
            >
              User
            </button>
            <button
              aria-label="Select Admin Role"
              className="px-8 py-4 text-xl font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-all transform hover:scale-105"
              onClick={() => handleRoleSelection('admin')}
            >
              Admin
            </button>
          </div>
        </>
      )}

      {role === 'user' && !loggedInAdmin && (
        <div className="w-[90%] max-w-md bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center text-blue-400">
            Welcome, User! Please Sign In
          </h2>

          {/* Google Sign-In for User Role */}
          {providers &&
            Object.values(providers).map(
              (provider) =>
                provider.name === 'Google' && (
                  <div key={provider.name} className="flex justify-center">
                    <button
                      onClick={() => signIn(provider.id)} // Trigger Google Sign-In
                      className="px-8 py-4 text-xl font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-all transform hover:scale-105"
                    >
                      Using your Google Account
                    </button>
                  </div>
                )
            )}

          <button
            type="button"
            onClick={() => setRole(null)}
            className="w-full px-6 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600 transition mt-4"
          >
            Back
          </button>
        </div>
      )}

      {role === 'admin' && !loggedInAdmin && (
        <div className="w-[90%] max-w-md bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center text-blue-400">
            Admin Login
          </h2>

          <form onSubmit={handleAdminLogin} className="flex flex-col gap-6">
            <div>
              <label htmlFor="email" className="block text-sm text-white mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm text-white mb-1">
                Password:
              </label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
              <div
                className="absolute inset-y-11 right-6 flex items-center cursor-pointer text-white"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500 text-center">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400 transition"
            >
              Login
            </button>
          </form>

          <button
            type="button"
            onClick={() => setRole(null)}
            className="w-full px-6 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600 transition mt-4"
          >
            Back
          </button>
        </div>
      )}

      {loggedInAdmin && (
        <div className="w-[90%] max-w-md bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center text-blue-400">
            Welcome, Admin!
          </h2>
          <p className="text-center text-sm">
            You have successfully logged in. Click below to go to your dashboard.
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400 transition"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleSelection;
