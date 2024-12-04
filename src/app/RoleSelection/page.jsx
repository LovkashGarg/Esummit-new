'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {  useSession, getProviders, signIn } from 'next-auth/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RoleSelection = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [providers, setProviders] = useState(null);
  const [signUpStep, setSignUpStep] = useState(1); // Step tracking for sign-up process
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username,setUsername]=useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleSignIn = async () => {
    try {
      const response = await fetch('/api/signIn',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({ email ,password}),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        // Save the token to localStorage or context
        localStorage.setItem('jwtToken', data.token);
  
        // Trigger toast notifications
       toast.success('Sign-in successful!');
        toast.success(`You are signed in as: ${data.role}`);
  
        // Reload the page or fetch user data to update navbar
        router.push('/');
      
    }}   catch (error) {
      console.error('Error during sign-in:', error);
    }
  };
  
  const handleGenerateOtp = async () => {
    const usernameError = validateUsername(username);
    if (usernameError) {
      toast.error(usernameError);
      return;
    }
    try {
      const response = await fetch('/api/signUp/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email ,username}),
      });

      const data = await response.json();
      if (response.ok) {
        alert('OTP sent successfully. Please check your email.');
        setSignUpStep(2); // Move to the next step
      } else {
        toast.error(data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Internal server error. Please try again later.');
      console.error('Error during OTP generation:', error);
    }
  };

  const handleVerifyOtp = async () => {

    
    try {
      const response = await fetch('/api/signUp/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('OTP verified successfully.');
        setSignUpStep(3); 
      } else {
        toast.error(data.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Internal server error. Please try again later.');
      console.error('Error during OTP verification:', error);
    }
  };
  const validateUsername = (username) => {
    const regex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    if (!regex.test(username)) {
      return 'Username must be 8-20 characters long and alphanumeric.';
    }
    return null;
  };
  const handleCreatePassword = async () => {
   
    try {
      const response = await fetch('/api/signUp/create-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username}),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Account created successfully!');
        setIsSignUp(false);
        setSignUpStep(1);
      } else {
        toast.error(data.error || 'Failed to create account. Please try again.');
      }
    } catch (error) {
     toast.error('Internal server error. Please try again later.');
      console.error('Error during password creation:', error);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch('/api/signUp/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('OTP resent successfully.');
      } else {
        toast.error(data.error || 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Internal server error. Please try again later.');
      console.error('Error during OTP resend:', error);
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="flex justify-center gap-8 mb-6">
        <button
          onClick={() => setIsSignUp(false)}
          className={`px-4 py-2 text-lg font-semibold ${
            !isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
          } rounded`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsSignUp(true)}
          className={`px-4 py-2 text-lg font-semibold ${
            isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
          } rounded`}
        >
          Sign Up
        </button>
      </div>

      <div className="w-[90%] max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        {isSignUp ? (
          <>
            {/* Sign-Up Form */}
            {signUpStep === 1 && (
              <div className="flex flex-col gap-6">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                />
                <button
                  onClick={handleGenerateOtp}
                  className="w-full px-6 py-2 bg-blue-500 rounded text-white"
                >
                  Send OTP
                </button>
              </div>
            )}
            {signUpStep === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="otp" className="block text-sm text-white mb-1">
                  OTP:
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
                <button
                  onClick={handleResendOtp}
                  className="mt-2 text-sm text-blue-400 hover:underline"
                >
                  Resend OTP
                </button>
              </div>
              {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}
              <button
                onClick={handleVerifyOtp}
                className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400 transition"
              >
                Verify OTP
              </button>
            </div>
          )}

          {signUpStep === 3 && (
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="password" className="block text-sm text-white mb-1">
                  Create Password:
                </label>
                <div className="relative h-10 mb-4">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-400"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-6 flex items-center cursor-pointer text-white"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>

                </div>
              </div>
              {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}
              <button
                onClick={handleCreatePassword}
                className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400 transition"
              >
                Create Account
              </button>
            </div>
          )}
          </>
        ) : (
          <>
            {/* Sign-In Form */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 mb-4 py-2 bg-gray-700 text-white rounded"
            />
            <div className="relative h-10 mb-4">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2  bg-gray-700 text-white rounded"
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              onClick={ handleSignIn}
              className="w-full px-6 py-2 bg-blue-500 rounded text-white"
            >
              Sign In
            </button>
          </>
        )}

        <div className="mt-6">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="w-full px-6 py-2 mt-4 bg-red-500 text-white rounded"
              >
                Sign in with {provider.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  </>
);
};

export default RoleSelection;
