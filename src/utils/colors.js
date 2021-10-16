import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
} from '@mui/material/colors';

const avatarColors = [
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
];

function getColorAvatar(input) {
  let counter = 0;
  input.split('').map((char) => {
    counter += char.charCodeAt();
    return undefined;
  });

  return avatarColors[counter % avatarColors.length][500];
}

function getPalette() {
  return ({
    primary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ad1457',
      light: '#e35183',
      dark: '#78002e',
      contrastText: '#ffffff',
    },
  });
}

export {
  getColorAvatar,
  getPalette,
};
