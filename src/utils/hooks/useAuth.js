import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth, isLoggedIn } from '../../firebase/auth';

function useAuth() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [loggedIn, loading];
}

export default useAuth;
