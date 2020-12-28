import { useState, useEffect } from 'react';
import firebase from '../../firebase/index';

import { isLoggedIn } from '../../firebase/auth';

function useAuth() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [loggedIn, loading];
}

export default useAuth;
