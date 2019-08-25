import React from 'react';
import Field from "./Field";

const Step2 = (props) => {
    const {
        email,
        mobile,
        countryId,
        city,
        onChange,
        getCountries,
        onChangeCountry,
        getCities,
        errorsEmail,
        errorsMobile,
        errorsCountryId,
        errorsCity
    } = props;

    return (
        <>
            <Field
                id="email"
                label="E-mail"
                type="text"
                name="email"
                value={email}
                placeholder="Enter e-mail"
                onChange={onChange}
                error={errorsEmail}
            />
            <Field
                id="mobile"
                label="Mobile"
                type="text"
                name="mobile"
                value={mobile}
                placeholder="Enter mobile"
                onChange={onChange}
                error={errorsMobile}
            />
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                    id="country"
                    className="form-control"
                    name="country"
                    value={countryId}
                    onChange={onChangeCountry}
                >
                    <option value="">Select country</option>
                    {getCountries}
                </select>
                {errorsCountryId ? <div className="invalid-feedback">{errorsCountryId}</div> : null}
            </div>
            <div className="form-group">
                <label htmlFor="country">City</label>
                <select
                    id="city"
                    className="form-control"
                    name="city"
                    value={city}
                    onChange={onChange}
                >
                    <option value="">Select city</option>
                    {getCities}
                </select>
                {errorsCity ? <div className="invalid-feedback">{errorsCity}</div> : null}
            </div>
        </>
    )
};

export default Step2;