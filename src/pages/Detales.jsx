import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import useDocment from '../hooks/useDocment';
import { useFirebase } from '../hooks/useFirebase';
import { BsTrashFill } from 'react-icons/bs';
import useAuthContext from '../hooks/useAuthContext';

const Detales = () => {
  const { id } = useParams();
  const { docData, error } = useDocment('projects', id);
  const { deleteDocument, response } = useFirebase('projects');
  const { user } = useAuthContext();

  const navigation = useNavigate();
  const deltedMe = (id) => {
    deleteDocument(id);
    if (!response.error) {
      navigation('/');
    }
  };

  return (
    <div className="mt-40 text-white h-[80vh]  relative w-full">
      {docData && docData.createdBy.id === user.uid && (
        <button onClick={() => deltedMe(docData.id)} className="bg-red-500 text-white p-2 absolute top-4 right-4  rounded-md">
          <BsTrashFill />
        </button>
      )}
      {docData && (
        <div className="contant text-3xl bg-black text-white rounded-lg p-4 capitalize">
          <h2 className="mb-2 "># {docData.name}</h2>
          <div className="footer mb-2 flex palce-items-center gap-4">
            <div className="flex mt-2">
              {docData.assignedListUsers.map((user) => {
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
          </div>
          <p className="text-gray-400 text-base">
            Due by <span className="text-white">{docData.dueDate.toDate().toDateString()}</span>
          </p>
          <p className="text-base text-gray-400">
            Ctead by : <span className="text-white">{docData.createdBy.name}</span>
          </p>
          <p className="text-base text-white underline  mb-2 rounded-md inline-block">#{docData.category}</p>
          <p className="text-base my-4 overflow-auto">{docData.details}</p>
        </div>
      )}
      <div className="comments">
        <Comments docInfo={docData} res={response} />
      </div>
    </div>
  );
};

export default Detales;
