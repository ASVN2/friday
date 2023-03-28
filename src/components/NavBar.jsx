import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { BiHomeAlt } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const NavBar = () => {
  const { logout } = useLogout();
  const navigat = useNavigate();
  const { user } = useAuthContext();

  return (
    <ul className="flex justify-between gap-5 mt-5 top-4 right-4 ">
      <div className="user">
        <button className="bg-black h-10 w-10 p-1 rounded-md  hover:border-white border-2 border-transparent  duration-300" onClick={() => navigat('/')}>
          <img src={user.photoURL} alt="" />
        </button>
      </div>
      <div className="icons flex gap-3">
        <button className="bg-black h-10 w-10 rounded-md flex justify-center place-items-center  hover:bg-green-500 duration-300" onClick={() => navigat('/')}>
          <BiHomeAlt className="text-white text-xl" />
        </button>

        <button onClick={() => navigat('/create')} className="bg-black flex justify-center place-items-center h-10 w-10  hover:bg-green-500 duration-300  rounded-md">
          <BsFillPatchPlusFill className="text-white text-xl" />
        </button>

        <button onClick={logout} className="bg-black flex justify-center place-items-center h-10 w-10 hover:bg-green-500 duration-300  rounded-md">
          <MdLogout className="text-white text-xl" />
        </button>
      </div>
    </ul>
  );
};

export default NavBar;
