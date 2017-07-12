import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';

const TextDisplay = require('../../components/display/text.jsx');

const Actions = require('../../actions/index.js');

const options = [
  'day',
  'week',
  'month',
  'year',
];

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapStateToProps(state) {
  return ({
    type: state.dateType,
  });
}

class DateTypeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      type: props.type,
      anchorEl: undefined,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.type !== nextProps.type) {
      this.setState({ type: nextProps.type });
    }
  }

  handleClick(ev) {
    this.setState({ open: true, anchorEl: ev.currentTarget });
  }

  handleMenuClick(ev, option) {
    this.setState({ open: false });
    this.context.store.dispatch(Actions.updateDateType(option));
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Button aria-owns="date-type-menu" aria-haspopup="true" onClick={this.handleClick}>
          <TextDisplay value={`date.${capitalize(this.state.type)}`} />
        </Button>
        <Menu
          id="date-type-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          { options.map(option =>
              (
                <MenuItem
                  key={option}
                  selected={option === this.state.type}
                  onClick={ev => this.handleMenuClick(ev, option)}
                >
                  <TextDisplay value={`date.${capitalize(option)}`} />
                </MenuItem>
              )
            )
          }
        </Menu>
      </div>
    );
  }
}

DateTypeMenu.propTypes = {
  type: PropTypes.oneOf(['day', 'week', 'month', 'year']).isRequired,
};

DateTypeMenu.contextTypes = {
  store: PropTypes.object.isRequired,
};

module.exports = connect(mapStateToProps)(DateTypeMenu);