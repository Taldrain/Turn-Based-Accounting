import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { TYPES, typeDisplay } from '../../utils/date-types';

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
    const { onChange } = this.props;
    this.setState({ anchorEl: null });
    onChange(type);
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
          {TYPES.map(type => (
            <MenuItem
              key={type}
              disabled={this.props.disabledTypes.indexOf(type) > -1}
              selected={type === this.props.type}
              onClick={ev => this.handleMenuItemClick(ev, type)}
            >
              {typeDisplay(type)}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

TypeMenu.propTypes = {
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
  disabledTypes: PropTypes.arrayOf(PropTypes.oneOf(['day', 'week', 'month', 'year'])),
  onChange: PropTypes.func.isRequired,
};

TypeMenu.defaultProps = {
  disabledTypes: [],
};

export default TypeMenu;
