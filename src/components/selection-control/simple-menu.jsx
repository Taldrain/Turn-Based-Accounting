import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

class SimpleMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleValue(key) {
    this.props.onSelect(key);
    this.handleClose();
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? this.props.id : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          variant={this.props.variant}
        >
          { this.props.options.find(i => i.key === this.props.value).label }
        </Button>
        <Menu
          id={this.props.id}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.options.map(i => (
            <MenuItem
              key={i.key}
              disabled={this.props.disabled.indexOf(i) > -1}
              selected={this.props.value === i.key}
              onClick={() => this.handleValue(i.key)}
            >
              {i.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SimpleMenu.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  disabled: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

SimpleMenu.defaultProps = {
  value: undefined,
  variant: 'text',
  disabled: [],
};

export default SimpleMenu;
