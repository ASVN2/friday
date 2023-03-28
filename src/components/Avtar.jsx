import React from 'react';

const Avtar = ({ pic }) => {
  return (
    <div className="w-fit">
      <img className="border-2  w-12 h-12 border-white rounded-full bg-black" src={pic} alt="user image" />
    </div>
  );
};

export default Avtar;
