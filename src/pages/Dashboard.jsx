import React from 'react';
import Sidebar from '../components/Sidebar';
import { useCollection } from '../hooks/useCollection';
import ProjectList from './ProjectList';
import { FaDiaspora } from 'react-icons/fa';

const Dashboard = () => {
  const { doc, error } = useCollection('projects');

  return (
    <div className="text-white">
      <h2 className="mt-16 text-3xl font-sans flex gap-2 place-items-center uppercase">
        <FaDiaspora className="text-orange-700" /> Dashboard
      </h2>
      {error && <p>{error}</p>}
      {doc && <ProjectList docs={doc} />}
    </div>
  );
};

export default Dashboard;
