import React from 'react';
import Button from '@mui/material/Button';

import { googleLogin } from '../../firebase/auth';

function LoginForm() {
  const handleClick = () => {
    googleLogin();
  };

  return (
    <Button color="primary" variant="contained" onClick={handleClick}>
      Login with Google
    </Button>
  );
}

export default LoginForm;
