import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const useCollection = (col) => {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = collection(db, col);

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
