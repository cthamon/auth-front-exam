import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { useUser } from './query/reactquery';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Password from './pages/Password';

import './App.css';

function App() {
  const { user } = useSelector(state => state.auth);
  const { mutate, isLoading } = useUser();
  const token = localStorage.getItem('token');

  useEffect(() => {
    mutate(token);
  }, [token]);

  if (isLoading) return <div style={{ width: '100vw', textAlign: 'center' }}>Loading...</div>;

  return (
    <main style={styles.layout}>
      <Navbar />
      {
        user &&
        <Routes>
          <Route path="/password" element={<Password />} />
          <Route path="/" element={<Profile />} />
        </Routes>
      }
      {
        !user &&
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      }
    </main>
  );
}

export default App;

const styles = {
  layout: {
    width: '100vw',
  }
};