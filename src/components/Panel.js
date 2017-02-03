import React from 'react'

export const Panel = (props) => {
  return <div>{props.children}</div>;
}

Panel.propTypes = {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
}

