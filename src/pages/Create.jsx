import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../hooks/useCollection';
import { BiMessageSquareError } from 'react-icons/bi';
import { Timestamp } from 'firebase/firestore';
import useAuthContext from '../hooks/useAuthContext';
import { useFirebase } from '../hooks/useFirebase';
import { useNavigate } from 'react-router-dom';
const categorys = [
  { value: 'sales', label: 'Sales' },
  { value: 'design', label: 'Design' },
  { value: 'degtal', label: 'Degtal' },
  { value: 'markoting', label: 'Markoting' },
  { value: 'learn', label: 'Learn' },
];

const Create = () => {
  const [name, setName] = useState(' ');
  const [dueDate, setDueDate] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [data, setData] = useState('');
  const [formError, setFormError] = useState('');
  const { user } = useAuthContext();
  const { doc } = useCollection('users');
  const { addDocs, response } = useFirebase('projects');

  const navigation = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a category');
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError('Please select a user');
      return;
    }

    const assignedListUsers = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoUrl: user.value.image,
        id: user.value.id,
      };
    });

    const createdBy = {
      photo: user.photoURL,
      name: user.displayName,
      id: user.uid,
    };

    const dataProject = {
      name,
      details,
      createdBy,
      assignedListUsers,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      comments: [],
    };

    await addDocs(dataProject);

    if (!response.error) {
      navigation('/');
    }
  };

  useEffect(() => {
    if (doc) {
      const opts = doc.map((user) => {
        return { value: user, label: user.displayName };
      });
      setData(opts);
    }
  }, [doc]);

  return (
    <div className="z-10 text-white mt-20 flex  flex-col place-items-center justify-center h-[80vh]">
      <h1 className="text-4xl mb-20">~~ Create New Project ~~</h1>
      <form onSubmit={submitHandler} className="w-[400px] ">
        <label className="mb-4 block">
          <span className="block mb-1"> Name: </span>
          <input required type="text" className="p-1 text-black outline w-full rounded-sm" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label className="mb-4 block">
          <span className="block mb-1"> Detailes: </span>
          <textarea required value={details} className="p-1 w-full resize-none h-20 text-black outline rounded-sm" onChange={(e) => setDetails(e.target.value)} />
        </label>

        <label className="mb-4 block">
          <span className="block mb-1"> Due Date: </span>
          <input required type="date" value={dueDate} className="p-1 w-full text-black outline rounded-sm" onChange={(e) => setDueDate(e.target.value)} />
        </label>

        <label className="mb-4 block">
          <span className="block mb-1"> Category: </span>
          <Select className="text-black " onChange={(op) => setCategory(op)} options={categorys} />
        </label>

        <label>
          <span className="block mb-1"> assigned To: </span>
          <Select className="text-black" isMulti onChange={(op) => setAssignedUsers(op)} options={data} />
        </label>

        <input type="submit" className="bg-white text-black w-full rounded-sm p-2 cursor-pointer hover:bg-green-400 duration-300 mt-6" value="Add Project" />
        {formError && (
          <p className="text-red-600 flex text-[19px] gap-1 place-items-center mt-2">
            <BiMessageSquareError /> {formError}
          </p>
        )}
      </form>
    </div>
  );
};

export default Create;
