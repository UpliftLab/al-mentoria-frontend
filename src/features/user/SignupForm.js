import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signupAsync } from './userSlice';
import Button from '../button/Button';

const SignupForm = () => {
  // const user = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleInput = (e) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupAsync({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success('Successfully signed up');
        navigate('/signin');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name" className="block mb-5">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </span>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            onChange={handleInput}
            placeholder="Name"
            required
          />
        </label>

        <label htmlFor="email" className="block mb-5">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </span>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            onChange={handleInput}
            placeholder="Email"
            required
          />
        </label>

        <label htmlFor="password" className="block mb-5">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </span>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            onChange={handleInput}
            placeholder="Password"
            required
          />
        </label>

        <div className="flex items-center justify-between">
          <Button child="Sign Up" isSubmit />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
