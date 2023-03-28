import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';

import { useEffect, useReducer, useState } from 'react';
import { db } from '../firebase/config';

const initalState = {
  error: null,
  isPending: false,
  success: null,
  document: null,
};

const firebaseReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOC':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload };
    case 'UPDATE_DOC':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'DELETED_DOC':
      return { isPending: false, document: action.payload, success: true, error: null };
    default:
      return state;
  }
};

export const useFirebase = (col) => {
  const [response, dispatch] = useReducer(firebaseReducer, initalState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = collection(db, col);

  // only dispatch is not cancelled
  const dispatchCancelled = (action) => {
    if (isCancelled) {
      dispatch(action);
    }
  };

  const addDocs = async (doc) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const timestamp = Timestamp.fromDate(new Date());
      const addedDoc = await addDoc(ref, { ...doc, createdAt: timestamp });
      dispatchCancelled({ type: 'ADDED_DOC', payload: addedDoc });
    } catch (error) {
      dispatchCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  //delted a Doc
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const refDoc = doc(db, col, id);
      const docsDel = await deleteDoc(refDoc);
      dispatchCancelled({ type: 'UPDATE_DOC', payload: docsDel });
    } catch (err) {
      dispatchCancelled({ type: 'ERROR', payload: 'could not delete' });
    }
  };

  // update a Doc
  const updateDocs = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const docRef = doc(db, col, id);
      const updatedDoc = await updateDoc(docRef, updates);
      dispatchCancelled({ type: 'UPDATE_DOC', payload: updatedDoc });
    } catch (error) {
      dispatchCancelled({ type: 'ERROR', payload: error.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocs, response, updateDocs, deleteDocument };
};
