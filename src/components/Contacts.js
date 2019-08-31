import React from 'react';
import Field from "./Field";
import countries from '../data/countries';
import cities from "../data/cities";

export default class Contacts extends React.Component {

    getCities = () => {
        const newCities = [];
        for (let key in cities) {
            if(cities[key].country === Number(this.props.country)) {
                newCities.push(cities[key])
            }
        }
        return newCities.map((item, index) => {
            return <option key={index} value={item.name}>{item.name}</option>
        })
    };

    render() {

        const {
            email,
            mobile,
            country,
            city,
            onChange,
            errors
        } = this.props;

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
                    error={errors.email}
                />
                <Field
                    id="mobile"
                    label="Mobile"
                    type="text"
                    name="mobile"
                    value={mobile}
                    placeholder="Enter mobile"
                    onChange={onChange}
                    error={errors.mobile}
                />
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                        id="country"
                        className="form-control"
                        name="country"
                        value={country}
                        onChange={onChange}
                    >
                        <option value="">Select country</option>
                        {countries.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {errors.country ? <div className="invalid-feedback">{errors.country}</div> : null}
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
                        {this.getCities()}
                    </select>
                    {errors.city ? <div className="invalid-feedback">{errors.city}</div> : null}
                </div>
            </>
        )
    }
}