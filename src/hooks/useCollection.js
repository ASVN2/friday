import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import useAuthContext from './useAuthContext';

export const useCollection = (col) => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(db, col);
    // let q = query(ref, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      ref,
      (snapShot) => {
        let results = [];
        snapShot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDoc(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError('Could not fetch the data!');
      }
    );

    return () => unsub;
  }, [col]);

  return { error, doc };
};
