import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../button/Button';
import { signinAsync } from './userSlice';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinAsync({ email, password }))
      .unwrap()
      .then(({ data }) => {
        toast.success(`Hello ${data.name}. You are successfully logged in.`);
        navigate('/');
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
        <label htmlFor="email" className="block mb-5">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </span>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
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
          <Button child="Sign In" isSubmit />
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
