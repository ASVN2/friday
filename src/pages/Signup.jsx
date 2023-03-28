import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineEmail } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { BsCardImage } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useSingup } from '../hooks/useSignup';

const Sinup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [them, setThem] = useState(null);
  const [errorThem, setErrorThem] = useState(null);
  const { error, isPending, signup } = useSingup();

  const submitHandler = (e) => {
    e.preventDefault();
    signup(email, password, displayName, them);
  };

  const valueHander = (e) => {
    let selected = e.target.files[0];
    if (!selected) {
      setErrorThem('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setErrorThem('Selected a file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setErrorThem('Image file size must be less then 100kb');
      return;
    }

    setErrorThem(null);
    setThem(selected);
  };

  return (
    <div className={`text-white h-screen bg-image1 flex justify-center place-items-center flex-col`}>
      <h1 className="text-4xl text-start mb-6">Signup</h1>

      <form onSubmit={submitHandler} className=" ">
        <label className="block mb-4">
          <span className="flex place-items-center gap-1">
            {' '}
            <MdOutlineEmail />
            Email
          </span>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="text-black shadow-md border-black border-2 outline-none p-1 px-2 rounded-sm"
          />
        </label>

        <label className="block mb-4">
          <span className="flex place-items-center gap-1">
            <FiUser /> Username
          </span>
          <input
            type="text"
            value={displayName}
            required
            onChange={(e) => setDisplayName(e.target.value)}
            className="text-black shadow-md border-black border-2 outline-none p-1 px-2 rounded-sm"
          />
        </label>

        <label className="block mb-4 ">
          <span className="flex place-items-center gap-1">
            <BsCardImage /> Image
          </span>
          <input type="file" onChange={valueHander} required className=" max-w-[265px] shadow-md border-white border bg-white text-gray-600 outline-none p-1 px-2 rounded-sm" />
          {errorThem && <p className="mt-1 text-red-300">{errorThem}</p>}
        </label>

        <label>
          <span className="flex place-items-center gap-1">
            <RiLockPasswordLine />
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-black shadow-md border-black border-2 outline-none p-1 px-2 rounded-sm"
          />
        </label>

        <div className="submit mt-4 gap-4 flex justify-between place-items-center w-full">
          <input className="flex-1  border-white border hover:bg-white duration-300 hover:text-black text-white p-1 px-2 cursor-pointer rounded-sm" type="submit" value="Sign up" />
          <Link className="block flex-1 text-gray-300  text-end" to={'/login'}>
            Go Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Sinup;
