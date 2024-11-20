import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/Auth';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import DashboardPage from './pages/Dashboard';
import TaskCreationPage from './pages/TaskCreation';
import TaskEditPage from './pages/TaskEdit';
import TaskViewPage from './pages/TaskView';
import GoogleSuccessPage from './pages/GoogleSuccess';

const App = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
      <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/create-task" element={user ? <TaskCreationPage /> : <Navigate to="/login" />} />
      <Route path="/edit-task/:id" element={user ? <TaskEditPage /> : <Navigate to="/login" />} />
      <Route path="/view-task/:id" element={user ? <TaskViewPage /> : <Navigate to="/login" />} />
      <Route path="/google-success" element={<GoogleSuccessPage />} />
    </Routes>
  );
};

export default App;
