import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import useDocment from '../hooks/useDocment';
import { useFirebase } from '../hooks/useFirebase';

const Detales = () => {
  const { id } = useParams();
  const { docData, error } = useDocment('projects', id);
  const { deleteDocument, response } = useFirebase('projects');

  const navigation = useNavigate();
  const deltedMe = (id) => {
    deleteDocument(id);
    if (!response.error) {
      navigation('/');
    }
  };

  return (
    <div className="mt-40 text-white h-[80vh] relative">
      <button onClick={() => deltedMe(docData.id)} className="bg-red-500 text-white p-2 absolute top-4 right-4 px-4 rounded-md">
        Delted
      </button>
      {docData && (
        <div className="contant  text-3xl bg-white text-black rounded-lg p-4 capitalize">
          <h2 className="mb-2">{docData.name}</h2>
          <p className="text-gray-400 text-base">
            Due by <span className="text-black">{docData.dueDate.toDate().toDateString()}</span>
          </p>
          <p className="text-base text-gray-400">
            Ctead by : <span className="text-black">{docData.createdBy.name}</span>
          </p>
          <p className="text-base my-4">{docData.details}</p>
          <div className="footer flex palce-items-center gap-4">
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
            <div className="bg-green-500 rounded-md text-base flex place-items-center px-4 text-white"># {docData.category}</div>
          </div>
        </div>
      )}
      <div className="comments">
        <Comments docInfo={docData} />
      </div>
    </div>
  );
};

export default Detales;
