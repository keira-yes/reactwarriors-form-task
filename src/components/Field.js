import React from 'react';

export default class Field extends React.Component {
    render() {
        const {id, label, type, name, value, placeholder, onChange, error} = this.props;

        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input
                    type={type}
                    className={'form-control ' + (error ? 'is-invalid' : '')}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {error ? <div className="invalid-feedback">{error}</div> : null}
            </div>
        )
    }
}