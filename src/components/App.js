import React from "react";
import Field from './Field';
import {steps} from '../data/steps';
import {countries} from '../data/countries';
import {cities} from '../data/cities';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            repeatPassword: '',
            gender: 'Male',
            email: '',
            mobile: '',
            country: '',
            city: '',
            errors: {},
            stepNumber: 2
        }
    }

    onValidate = (e) => {
        e.preventDefault();
        const errors = {};

        if (this.state.firstName.length < 5)errors.firstName = "Must be 5 characters or more";
        if(this.state.lastName.length < 5) errors.lastName = "Must be 5 characters or more";
        if(this.state.password.length < 6) errors.password = "Must be 6 characters or more";
        if(this.state.repeatPassword !== this.state.password) errors.repeatPassword = "Must be equal password";

        if (Object.keys(errors).length > 0) {
            this.setState({errors});
        } else {
            this.setState({
                errors: {},
                stepNumber: this.state.stepNumber + 1
            });
        }

    };

    onComeBack = () => {
        this.setState({
            stepNumber: this.state.stepNumber - 1
        });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    getCountries = (items) => {
      return items.map(item => {
          return <option key={item.id} value={item.name}>{item.name}</option>
      })
    };

    getCities = (items) => {
        console.log(items);
    };

    render() {
        return (
            <div className="form-container card">
                <form className="form card-body">
                    <div className="steps d-flex justify-content-between">
                        {steps.map(item => (
                            <div
                                key={item.id}
                                className={'steps-item' + (this.state.stepNumber === item.id ? ' active' : '') + (this.state.stepNumber > item.id ? ' complete' : '')}
                                onClick={() =>
                                    this.state.stepNumber > item.id ?
                                        this.setState({stepNumber: item.id}) : ''}
                            >
                                <span>{item.id}</span>
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                    {this.state.stepNumber === 1 && <>
                        <Field
                            id="firstName"
                            label="First name"
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            placeholder="Enter first name"
                            onChange={this.onChange}
                            error={this.state.errors.firstName}
                        />
                        <Field
                            id="lastName"
                            label="Last name"
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            placeholder="Enter last name"
                            onChange={this.onChange}
                            error={this.state.errors.lastName}
                        />
                        <Field
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Enter password"
                            onChange={this.onChange}
                            error={this.state.errors.password}
                        />
                        <Field
                            id="repeatPassword"
                            label="Repeat password"
                            type="password"
                            name="repeatPassword"
                            value={this.state.repeatPassword}
                            placeholder="Repeat password"
                            onChange={this.onChange}
                            error={this.state.errors.repeatPassword}
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
                                    onChange={this.onChange}
                                    checked={this.state.gender === 'Male'}
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
                                    onChange={this.onChange}
                                    checked={this.state.gender === 'Female'}
                                />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                        </div>
                    </>}
                    {this.state.stepNumber === 2 && <>
                        <Field
                            id="email"
                            label="E-mail"
                            type="text"
                            name="email"
                            value={this.state.email}
                            placeholder="Enter e-mail"
                            onChange={this.onChange}
                            error={this.state.errors.email}
                        />
                        <Field
                            id="mobile"
                            label="Mobile"
                            type="text"
                            name="mobile"
                            value={this.state.mobile}
                            placeholder="Enter mobile"
                            onChange={this.onChange}
                            error={this.state.errors.mobile}
                        />
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select
                                id="country"
                                className="form-control"
                                name="country"
                                value={this.state.country}
                                onChange={this.onChange}
                            >
                                <option value="">Select country</option>
                                {this.getCountries(countries)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">City</label>
                            <select
                                id="city"
                                className="form-control"
                                name="city"
                                value={this.state.city}
                                onChange={this.onChange}
                            >
                                <option value="">Select city</option>
                                {this.getCities(cities)}
                            </select>
                        </div>
                    </>}
                    {this.state.stepNumber === 3 && <div>Step 3</div>}
                    {this.state.stepNumber < 4 &&
                    <div className='d-flex justify-content-center'>
                        <button
                            type="button"
                            className="btn btn-outline-secondary col-4 mr-3"
                            disabled={this.state.stepNumber === 1}
                            onClick={this.onComeBack}
                        >Previous
                        </button>
                        <button
                            type="submit"
                            className="btn btn-outline-secondary col-4"
                            onClick={this.onValidate}
                        >Next
                        </button>
                    </div>}
                    {this.state.stepNumber === 4 && <div>Step 4</div>}
                </form>
            </div>
        );
    }
}
