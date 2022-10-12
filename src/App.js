import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { app } from 'config/firebase';

import Signin from 'pages/Signin';
import Dashboard from 'pages/Dashboard';
import Project from 'pages/Project';
import Condition from 'pages/Condition';
import ForgotPassword from 'pages/ForgotPassword';
import Protected from 'components/protected'

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        navigate('/dashboard')
      } else {
        navigate('/signin')
      }
    });
   return unsubscribe;
  }, []);

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/dashboard" exact element={<Protected><Dashboard /></Protected>} />
        <Route path="/projects/1" exact element={<Protected><Project /></Protected>} />
        <Route path="/projects/1/condition" exact element={<Protected><Condition /></Protected>} />

        <Route path="/signin" exact element={<Signin />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/" exact element={<Navigate to="/dashboard" replace={true} />} />
        
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
