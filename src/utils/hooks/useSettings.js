import useFirestore from './useFirestore';

import { fetchSettings } from '../../firebase/firestore';

function useSettings() {
  return useFirestore(fetchSettings, {});
}

export default useSettings;
