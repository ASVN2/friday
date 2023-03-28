import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { AiFillPlusSquare } from 'react-icons/ai';
import useAuthContext from '../hooks/useAuthContext';
import Avtar from './Avtar';

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <div className="user text-white absolute top-0 left-0 bg-gray-700 w-[350px] h-screen">
      <div className="user mb-4 border-b-2 p-3 pb-6  border-gray-500 flex flex-col place-items-center gap-4">
        <div className="logo">{user && <Avtar pic={user.photoURL} />} </div>
        <div className="name text-2xl font-semibold">
          Hey, {user && user.displayName} <span className="wave">👋</span>
        </div>
      </div>
      <div className="contant flex flex-col justify-center mt-20 place-items-end ">
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            `dashboard justify-center p-2 rounded-tl-full mb-4 rounded-bl-full ${isActive ? 'bg-green-400' : 'bg-gray-600'} w-[70%] flex gap-1 place-items-center text-xl`
          }>
          <MdSpaceDashboard /> Dashboard
        </NavLink>
        <NavLink
          to={'/create'}
          className={({ isActive }) =>
            `dashboard justify-center p-2 rounded-tl-full mb-4 rounded-bl-full ${isActive ? 'bg-green-400' : 'bg-gray-600'} w-[70%] flex gap-1 place-items-center text-xl`
          }>
          <AiFillPlusSquare /> Create
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
