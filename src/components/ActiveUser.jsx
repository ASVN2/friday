import React from 'react';
import { useCollection } from '../hooks/useCollection';
import Avtar from './Avtar';

const ActiveUser = () => {
  const { error, doc } = useCollection('users');
  return (
    <div className="w-[300px] bg-gray-700 h-screen absolute top-0 right-0 ">
      <h2 className="text-2xl text-center text-white mt-16 font-bold">All Users</h2>

      <div className="users mt-10">
        {doc &&
          doc.map((user) => {
            return (
              <div key={user.id} className="text-white  justify-end mb-4 gap-2 place-items-center text-2xl px-8 flex">
                <p>{user.displayName}</p>
                <div className="image relative">
                  <Avtar pic={user.image} />
                  {user.online && <span className="h-4 w-4 border border-white bg-green-500 rounded-full absolute top-0 right-0 "></span>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ActiveUser;
