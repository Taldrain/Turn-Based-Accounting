import React from 'react';

const trianglify = require('trianglify');

const style = {
  zIndex: '-1',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
};

class TrianglifyBackground extends React.Component {
  constructor() {
    super();

    this.debounceTimer = undefined;

    this.redraw = this.redraw.bind(this);
    this.debounceRedraw = this.debounceRedraw.bind(this);
  }

  componentDidMount() {
    this.redraw();
    window.addEventListener('resize', this.debounceRedraw);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceRedraw);
  }

  debounceRedraw() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(this.redraw, 300);
  }

  redraw() {
    const width = Math.max(
      document.body.clientWidth,
      document.documentElement.offsetWidth,
      window.innerWidth,
    );

    const height = Math.max(
      document.body.scrollHeight,
      document.body.clientHeight,
      document.documentElement.offsetHeight,
      window.innerHeight,
    );

    const pattern = trianglify({
      width,
      height,
      seed: Date.now(),
    });

    pattern.canvas(this.node);
  }

  render() {
    return (
      <canvas
        style={style}
        ref={(node) => {
          this.node = node;
          return undefined;
        }}
      />
    );
  }
}

module.exports = TrianglifyBackground;
