import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin'); // Default user type set to 'admin'
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    try {
      // Determine the endpoint based on user type
      const endpoint = userType === 'admin' ? '/api/user/admin' : '/api/user/superadmin';
      const response = await axios.post(backendUrl + endpoint, { email, password });
      console.log(response);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
         // Set token for authentication
        navigate('/add'); // Redirect to home page
      } else {
        toast.error(response.data.message); // Show error message if login fails
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during login."); // General error message
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-gray-100 shadow-black shadow-2xl rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-semibold text-gray-700 mb-2'>Email Address</p>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none' 
              type="email" 
              placeholder='your@email.com' 
              required 
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-semibold text-gray-700 mb-2'>Password</p>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none' 
              type="password" 
              placeholder='Enter your password' 
              required 
            />
          </div>
          <div className='mb-3'>
            <label className='text-sm font-semibold text-gray-700 mb-2'>User Type</label>
            <select 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)} 
              className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none'
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-950 hover:font-semibold' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
