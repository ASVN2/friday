import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={`text-white h-screen bg-image1  flex justify-center place-items-center flex-col`}>
      <h1 className="text-4xl text-start mb-4">Login</h1>
      <form onSubmit={submitHandler} className=" ">
        <label className="block mb-4">
          <span className="flex place-items-center gap-1">
            {' '}
            <MdOutlineEmail />
            Email
          </span>
          <input
            type="text"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="text-black shadow-md border-black border-2 outline-none p-1 px-2 rounded-sm"
          />
        </label>

        <label>
          <span className="flex place-items-center gap-1">
            <RiLockPasswordLine />
            Password
          </span>{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-black shadow-md border-black border-2 outline-none p-1 px-2 rounded-sm"
          />
        </label>

        <div className="submit mt-4 gap-4 flex justify-between place-items-center w-full">
          <input className="flex-1  border-white border hover:bg-white duration-300 hover:text-black text-white p-1 px-2 cursor-pointer rounded-sm" type="submit" value="Login" />
          <Link className="block flex-1 text-gray-300  text-end" to={'/signup'}>
            Create One
          </Link>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
