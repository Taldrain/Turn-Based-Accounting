import React from 'react';
import PropTypes from 'prop-types';
import { UISrefActive, UISref } from '@uirouter/react';

function SidebarLink(props) {
  return (
    <UISrefActive class="active">
      <UISref to={props.path}>
        { props.children }
      </UISref>
    </UISrefActive>
  );
}

SidebarLink.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidebarLink;
