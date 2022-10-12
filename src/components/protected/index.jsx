import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from "react";
import { CgSpinner } from 'react-icons/cg';

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
    });
   return unsubscribe;
  }, [])

  return user 
    ? children 
    : (
      <div className="flex justify-center items-center min-h-screen">
        <CgSpinner size={30} className="animate-spin" />
    </div>
    )
};

export default Protected;