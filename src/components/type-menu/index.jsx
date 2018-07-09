import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { typeDisplay } from '../../utils/entry';

const OPTIONS = [
  'day',
  'week',
  'month',
  'year',
];


class TypeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleClickListItem(ev) {
    this.setState({ anchorEl: ev.currentTarget });
  }

  handleMenuItemClick(ev, type) {
    this.setState({ anchorEl: null });
    this.props.onChange(type);
  }

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'type-display' : null}
          aria-haspopup="true"
          onClick={this.handleClickListItem}
        >
          {typeDisplay(this.props.type)}
        </Button>
        <Menu
          id="type-display"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {OPTIONS.map(option => (
            <MenuItem
              key={option}
              selected={option === this.props.type}
              onClick={ev => this.handleMenuItemClick(ev, option)}
            >
              {typeDisplay(option)}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

TypeMenu.propTypes = {
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TypeMenu;
