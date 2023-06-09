import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { timestamp } from '../firebase/config';
import useAuthContext from '../hooks/useAuthContext.js';
import { useFirebase } from '../hooks/useFirebase';
import { formatDistanceToNow } from 'date-fns';

const Comments = ({ docInfo }) => {
  const [comment, setComment] = useState('');
  const { user } = useAuthContext();
  const [pandding, setPandding] = useState(false);
  const { updateDocs, response } = useFirebase('projects');

  const handleSubmit = async (e) => {
    setPandding(true);
    e.preventDefault();
    const commentInfo = {
      dispalyName: user.displayName,
      photoUrl: user.photoURL,
      content: comment,
      id: Math.random(),
      createAt: Timestamp.fromDate(new Date()),
    };

    await updateDocs(docInfo.id, {
      comments: [...docInfo.comments, commentInfo],
    });
    if (!response.error) {
      setComment('');
      setPandding(false);
    }
  };

  return (
    <div className="mt-6  overflow-hidden">
      <form onSubmit={handleSubmit} className="">
        <span className="text-green-400 text-[20px] block mb-1 capitalize font-semibold">new comment</span>
        <div className="filed flex gap-4">
          <input
            type="text"
            className="block w-full resize-none rounded-sm p-2 outline-none text-black"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required></input>
          {!pandding && <button className="bg-gray-500 rounded-sm px-6 hover:bg-green-500 duration-300">Send</button>}
          {pandding && (
            <button disabled className="bg-gray-500 rounded-sm px-6 hover:bg-green-500 duration-300">
              Sending...
            </button>
          )}
        </div>
      </form>

      <div className="comments mt-10 h-[300px]  scrollbar  overflow-y-auto ">
        {docInfo &&
          docInfo.comments.map((comment) => {
            return (
              <div key={comment.id} className="flex gap-4 bg-black p-4 rounded-lg mb-4">
                <img src={comment.photoUrl} className="h-10 w-10  rounded-full border-2 border-white" alt="" />

                <div className="contant">
                  <div className="name&time flex text-sm capitalize">
                    <p>{comment.dispalyName}</p>
                    <p className="mx-2">-</p>
                    <p className="text-gray-400">{formatDistanceToNow(comment.createAt.toDate(), { addSuffix: true })}</p>
                  </div>
                  <div className="contant mt-1">{comment.content}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
