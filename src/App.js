import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { app, auth } from 'config/firebase';

import Signin from 'pages/Signin';
import Dashboard from 'pages/Dashboard';
import Projects from 'pages/Projects';
import Users from 'pages/Users';
import CreateUser from 'pages/CreateUser';
import Project from 'pages/Project';
import Condition from 'pages/Condition';
import ForgotPassword from 'pages/ForgotPassword';
import Protected from 'components/protected'

const App = () => {

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" exact element={<Protected><Dashboard /></Protected>} />
        <Route path="/users" exact element={<Protected><Users /></Protected>} />
        <Route path="/users/create" exact element={<Protected><CreateUser /></Protected>} />
        <Route path="/:userId" exact element={<Protected><Projects /></Protected>} />
        <Route path="/:userId/:projectId" exact element={<Protected><Project /></Protected>} />
        <Route path="/:userId/:projectId/:conditionId" exact element={<Protected><Condition /></Protected>} />

        <Route path="/signin" exact element={<Signin />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
