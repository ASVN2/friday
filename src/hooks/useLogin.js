import { auth, db } from '../firebase/config';
import { useEffect, useState } from 'react';
import useAuthContext from './useAuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, updateDoc } from 'firebase/firestore';
// import { auth } from '../firebase/config';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(collection(db, 'users'), userCredential.user.uid), { online: true });
      dispatch({ type: 'LOGIN', payload: userCredential.user });

      if (!isCancelled) {
        isPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log('userCredential', error.message);
        setIsPending(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};

// export default useLogin;
