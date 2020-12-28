import { useEffect, useState } from 'react';

function useFirestore(method, defaultValue) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function wrapper() {
      setData(await method());
      setLoading(false);
    }

    wrapper();
  }, []);

  return [data, loading];
}

export default useFirestore;
