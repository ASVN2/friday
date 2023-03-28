import React from 'react';
import { useLogout } from '../hooks/useLogout';

const NavBar = () => {
  const { logout } = useLogout();

  return (
    <ul className="flex justify-end mt-5  absolute top-4 right-4 mr-[350px]">
      <button onClick={logout} className="border-white border text-white p-2 px-6 rounded-full hover:bg-white hover:text-green-600 duration-300">
        Log out
      </button>
    </ul>
  );
};

export default NavBar;
