import React from 'react'

export const FormName = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" 
            onChange={props.handleInputChange}
            value={props.addition} />
    </form>)

    FormName.propTypes = {
        nameText: React.PropTypes.string.isRequired,
        handleInputChange: React.PropTypes.func.isRequired,
        handleSubmit: React.PropTypes.func.isRequired
    }