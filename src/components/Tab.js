import React from 'react'

export const Tab = (props) => {
  return <div>{props.children}</div>;
}

Tab.propTypes = {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
}

