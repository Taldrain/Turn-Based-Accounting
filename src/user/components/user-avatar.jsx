import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

import { getColorAvatar } from '../../utils/colors';

const styles = {
  root: {
    margin: 10,
    color: '#ffffff',
  },
};

function UserAvatar({ user }) {
  if (user.photoURL) {
    return <Avatar alt={user.displayName} src={user.photoURL} />;
  }

  const newStyle = ({ ...styles.root, backgroundColor: getColorAvatar(user.displayName) });

  return (
    <Avatar style={newStyle}>
      {
        // take the two first char from the first char of each name (longer
        // than the 3 char) in the display name.
        user.displayName
          .split(' ')
          .map((n) => {
            if (n.length >= 3) {
              return n[0];
            }

            return '';
          })
          .join('')
          .substring(0, 2)
          .toUpperCase()
      }
    </Avatar>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
  }).isRequired,
};

export default UserAvatar;
