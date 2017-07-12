import React from 'react';
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
  path: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

module.exports = SidebarLink;
