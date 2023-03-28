import React from 'react';
import { Link } from 'react-router-dom';
import Avtar from '../components/Avtar';

const ProjectList = ({ docs }) => {
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2  grid-cols-1  justify-start place-content-start gap-5 mt-10 h-[80vh] scrollbar overflow-y-auto">
      {docs &&
        docs.map((doc) => {
          return (
            <Link to={`/detales/${doc.id}`} className="project p-4 h-fit hover:bg-gray-700 shadow-md duration-300  bg-black rounded-xl">
              <p className="text-xl">
                {doc.name.slice(0, 20)}
                {doc.name.length > 20 && '...'}
              </p>
              <span className="text-gray-400 border-b block pb-2 border-gray-400  ">Due by {doc.dueDate.toDate().toDateString()}</span>
              <span className="mt-2 block text-gray-400">Project assigned To</span>
              <div className="flex mt-2">
                {doc.assignedListUsers.map((user) => {
                  return (
                    <img
                      className="h-8 first:ml-0 border-2 bg-gray-900 border-white
                   -ml-3 w-8 overflow-hidden rounded-full"
                      src={user.photoUrl}
                      alt=""
                    />
                  );
                })}
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default ProjectList;
