import React from 'react';

const Field = (props) => {
    const {id, label, type, name, value, placeholder, onChange, error} = props;

    return(
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
};

export default Field;