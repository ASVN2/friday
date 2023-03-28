import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, storage, db } from '../firebase/config';
import useAuthContext from './useAuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';

export const useSingup = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, them) => {
    setError(null);
    setIsPending(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (!useAuthContext) {
        throw new Error("Could't Complete Singup");
      }

      //avtar
      const uploadPath = `thumbails/${userCredential.user.uid}/${them.name}`;
      const imgRef = ref(storage, uploadPath);

      await uploadBytes(imgRef, them);
      const imgUrl = await getDownloadURL(imgRef);

      await setDoc(doc(collection(db, 'users'), userCredential.user.uid), {
        online: true,
        image: imgUrl,
        displayName,
      });

      updateProfile(userCredential.user, { displayName, photoURL: imgUrl });

      await dispatch({ type: 'LOGIN', payload: userCredential.user });
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
