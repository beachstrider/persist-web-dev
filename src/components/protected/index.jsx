import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from "react";

const Protected = ({children}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    let flagIsPageLoaded = false;

    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user?.uid) {
        console.log('auth state logged in');
        flagIsPageLoaded = true;
        setUser(user)
      } else {
        console.log('auth state logged out');
        if (!flagIsPageLoaded) {
          navigate('/signin')
        }
      }



      if (user) {
        navigate('/dashboard')
        // no error
      } else {
        console.log('222')

      }
    });
   return unsubscribe;
  }, [])

  return user ? children : ''
};

export default Protected;