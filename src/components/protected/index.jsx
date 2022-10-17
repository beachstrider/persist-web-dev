import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from 'config/firebase'
import { useEffect, useState } from "react";
import { CgSpinner } from 'react-icons/cg';
import {
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
import { authUserAtom } from 'store'

const Protected = ({children}) => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(null)
  const [ authUser, setAuthUser ] = useRecoilState(authUserAtom)

  useEffect(() => {
    let flagIsPageLoaded = false;

    const unsubscribe = onAuthStateChanged(getAuth(), async (auth) => {
      if (auth?.uid) {
        flagIsPageLoaded = true;
        
        const userData = await getDoc(doc(db, "users", auth.uid))
        setAuthUser(userData.data())
        setAuth(auth)
      } else {
        if (!flagIsPageLoaded) {
          navigate('/signin')
        }
      }
    });
   return unsubscribe;
  }, [])

  return auth 
    ? children 
    : (
      <div className="flex justify-center items-center min-h-screen">
        <CgSpinner size={30} className="animate-spin" />
    </div>
    )
};

export default Protected;