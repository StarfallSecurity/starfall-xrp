import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import { loginUser } from '../services/network/auth';
import useToken from '../hooks/useToken';
import { validateUserDetails } from '../utils/Utils';
import EyeOffIcon from '../images/eyeOff';
import EyeIcon from '../images/eye';

interface LoginFormState {
  username: string;
  password: string;
  error: string;
  isLoading: boolean;
  isSubmitted: boolean;
}

const Signin: React.FC = () => {
  const { setToken } = useToken();
  const [formData, setFormData] = useState<LoginFormState>({
    username: '',
    password: '',
    error: '',
    isLoading: false,
    isSubmitted: false
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('name ', name, value, e.target);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      error: ''
    }));
  };

  const handleButtonClick = async (e: FormEvent) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setFormData((prevData) => ({
        ...prevData,
        error: 'Please enter both username and password.',
        isSubmitted: true
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      isLoading: true,
      isSubmitted: true
    }));

    try {
      const response = await loginUser({ username, password });
      if (response) {
        setToken(response.token);
        setFormData((prevData) => ({
          ...prevData,
          isLoading: false
        }));
      }
    } catch (error: any) {
      setFormData((prevData) => ({
        ...prevData,
        error: 'An error occurred while logging in.',
        isLoading: false
      }));
    }
  };

  const { username, password, error, isLoading, isSubmitted } = formData;
  const hasUsernameError = !username && isSubmitted;
  const hasPasswordError = !password && isSubmitted;
  console.log('hasError', hasUsernameError, hasPasswordError, username);

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path
                      d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                      fill="url(#logo-a)"
                    />
                    <path
                      d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                      fill="url(#logo-b)"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">Welcome back! ✨</h1>

              {/* Error */}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                      Username
                    </label>
                    <input
                      onChange={handleInputChange}
                      id="username"
                      name="username"
                      className={`form-input w-full border ${
                        hasUsernameError ? 'border-red-500' : ''
                      }`}
                      type="username"
                    />
                    {hasUsernameError && (
                      <p className="text-red-500 text-sm mt-1">Username is required.</p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      className={`form-input w-full border ${
                        hasPasswordError ? 'border-red-500' : ''
                      } px-3 py-2`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform  focus:outline-none"
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" to="/reset-password">
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    onClick={handleButtonClick}
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  >
                    {isLoading ? 'Logging in...' : 'Sign In'}
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Don’t you have an account?{' '}
                  <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signup">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
          <img
            className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block"
            src={AuthDecoration}
            width="218"
            height="224"
            alt="Authentication decoration"
          />
        </div>
      </div>
    </main>
  );
};

export default Signin;
