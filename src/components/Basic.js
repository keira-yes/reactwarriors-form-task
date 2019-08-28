import React from 'react';
import Field from "./Field";

export default class Basic extends React.Component {

    render() {
        const {
            firstName,
            lastName,
            password,
            repeatPassword,
            gender,
            onChange,
            errors
        } = this.props;

        return (
            <>
                <Field
                    id="firstName"
                    label="First name"
                    type="text"
                    name="firstName"
                    value={firstName}
                    placeholder="Enter first name"
                    onChange={onChange}
                    error={errors.firstName}
                />
                <Field
                    id="lastName"
                    label="Last name"
                    type="text"
                    name="lastName"
                    value={lastName}
                    placeholder="Enter last name"
                    onChange={onChange}
                    error={errors.lastName}
                />
                <Field
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={onChange}
                    error={errors.password}
                />
                <Field
                    id="repeatPassword"
                    label="Repeat password"
                    type="password"
                    name="repeatPassword"
                    value={repeatPassword}
                    placeholder="Repeat password"
                    onChange={onChange}
                    error={errors.repeatPassword}
                />
                <div className="form-group">
                    <div>Gender</div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="Male"
                            onChange={onChange}
                            checked={gender === 'Male'}
                        />
                        <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="Female"
                            onChange={onChange}
                            checked={gender === 'Female'}
                        />
                        <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
                </div>
            </>
        )
    }
}