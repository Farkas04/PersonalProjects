import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthService from '../../api/authService';
import useAlert from '../../hooks/useAlert';
import Alert from '../../components/shared/Alert';

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { email, password, rememberMe } = formData;

  const { alert, showAlert, hideAlert } = useAlert();

  const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onCheckboxChange = e => setFormData({ ...formData, rememberMe: e.target.checked });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await AuthService.login(email, password, rememberMe);
        navigate('/');
        window.location.reload();
    } catch (error) {
      showAlert({ show: true, text: `${error.response.data.message}`, type: 'danger' });
    }
    setTimeout(() => {
      hideAlert();
    }, [3000])
  };

  return (
    <>
      {alert.show && <Alert {...alert} />}
      <h1 className='mb-4 ml-5 font-bold text-gray-700 text-2xl'>Log In</h1>
      <form className='w-3/4' onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            <button
              type="button"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              className="absolute right-0 mr-2 mb-3 text-gray-600 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={onCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-gray-700 text-sm">
            Remember Me
          </label>
        </div>
        <div className="flex justify-between">
          <div className='flex object-left'>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
          <div className='flex text-right'>
            <Link to="/auth/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Don't have an account?<br/> Sign up
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LogIn;