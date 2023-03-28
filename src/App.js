import { Link, Navigate, Route, Router, Routes } from 'react-router-dom';
import ActiveUser from './components/ActiveUser';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import useAuthContext from './hooks/useAuthContext';
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Detales from './pages/Detales';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="mr-[400px] ml-[400px] ">
      {user && <NavBar />}
      <Routes>
        <Route path="/" exect element={user ? <Dashboard /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={'/'} />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to={'/'} />} />
        <Route path="/create" element={user ? <Create /> : <Navigate to={'/login'} />} />
        <Route path="/detales/:id" element={user ? <Detales /> : <Navigate to={'/login'} />} />
      </Routes>
      {user && <Sidebar />}
      {user && <ActiveUser />}
    </div>
  );
}

export default App;
