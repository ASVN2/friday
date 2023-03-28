import { signOut } from 'firebase/auth';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import useAuthContext from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState();
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState();
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      await updateDoc(doc(collection(db, 'users'), user.uid), { online: false });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
