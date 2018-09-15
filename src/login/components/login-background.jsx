import React from 'react';
import Particles from 'particlesjs';

const styles = {
  root: {
    position: 'absolute',
    display: 'block',
    top: 0,
    left: 0,
    zIndex: 0,
  },
};

class LoginBackground extends React.Component {
  componentDidMount() {
    Particles.init({
      selector: '.login-background',
      connectParticles: true,
      color: '#ad1457',
    });
  }

  componentWillUnmount() {
    Particles.destroy();
  }

  render() {
    return (
      <canvas className="login-background" style={styles.root} />
    );
  }
}

export default LoginBackground;
