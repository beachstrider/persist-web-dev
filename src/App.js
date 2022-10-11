import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { PublicRoute, PrivateRoute } from './Routes';

import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/projects/1" exact element={<Project />} />

        <Route path="/signin" exact element={<Signin />} />
        <Route path="/" exact element={<Navigate to="/signin" replace={true} />} />
        
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
