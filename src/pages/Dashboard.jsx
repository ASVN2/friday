import React from 'react';
import Sidebar from '../components/Sidebar';
import { useCollection } from '../hooks/useCollection';
import ProjectList from './ProjectList';

const Dashboard = () => {
  const { doc, error } = useCollection('projects');

  return (
    <div className="text-white">
      <h2 className="mt-10 text-xl">Dashboard</h2>
      {error && <p>{error}</p>}
      {doc && <ProjectList docs={doc} />}
    </div>
  );
};

export default Dashboard;
