import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'
import { useEffect } from "react";

const Protected = ({children}) => {
  const navigate = useNavigate()
  const auth = getAuth().currentUser

  useEffect(() => {
    if (!auth) {
      navigate('/signin');
    }
  }, []);
  
  return children;
};

export default Protected;