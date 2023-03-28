import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const useDocment = (col, id) => {
  const [docData, setDocData] = useState('');
  const [error, setError] = useState('');

  // Data
  useEffect(() => {
    const projectRef = doc(db, col, id);

    const unsubscribe = onSnapshot(
      projectRef,
      (snapshot) => {
        setDocData({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      },
      (err) => {
        console.log(err.message);
        setError('Failed to get document');
      }
    );

    return () => unsubscribe();
  }, [col, id]);

  return { docData, error };
};

export default useDocment;
