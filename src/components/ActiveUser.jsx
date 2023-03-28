import React from 'react';
import { useCollection } from '../hooks/useCollection';
import Avtar from './Avtar';

const ActiveUser = () => {
  const { error, doc } = useCollection('users');
  return (
    <div className="holer ">
      <div className="w-[300px] bg-gray-800 h-screen fixed top-0 left-0 px-6 ">
        <h2 className="text-2xl  text-white mt-16 font-bold">All Users</h2>
        <div className="users mt-10 scrollbar overflow-auto  h-[80%]">
          {doc &&
            doc.map((user) => {
              return (
                <div key={user.id} className="text-white  bg-gray-500 p-1 rounded-md  justify-start mb-4 gap-2 place-items-center text-2xl  flex">
                  <div className="image relative pl-2">
                    <Avtar pic={user.image} />
                    {user.online && <span className="h-4 w-4 border border-white bg-green-500 rounded-full absolute top-0 right-0 "></span>}
                  </div>
                  <div className="name text-sm">
                    <p className="font-bold">{user.displayName}</p>
                    <p className="text-gray-300">{user.online ? 'user is online' : 'user is offline'}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ActiveUser;
