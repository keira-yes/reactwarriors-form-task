import React from "react";
import Field from './Field';
import {steps} from '../data/steps';
import countries from '../data/countries';
import cities from '../data/cities';

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
            countryId: '',
            countryName: '',
            cities: [],
            city: '',
            avatar: '',
            errors: {},
            stepNumber: 1
        }
    }

    onValidate = (e) => {
        e.preventDefault();
        const errors = {};

        if(this.state.stepNumber === 1) {
            if (this.state.firstName.length < 5) errors.firstName = "Must be 5 characters or more";
            if(this.state.lastName.length < 5) errors.lastName = "Must be 5 characters or more";
            if(this.state.password.length < 6) errors.password = "Must be 6 characters or more";
            if(this.state.repeatPassword !== this.state.password) errors.repeatPassword = "Must be equal password";
        }
        if(this.state.stepNumber === 2) {
            if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) errors.email = "Invalid email address";
            if (!this.state.mobile.match(/^\+(?:[0-9-] ?){6,14}[0-9]$/)) errors.mobile = "Your number doesn't match +3801111111";
            if (!this.state.countryId) errors.countryId = "This field is required";
            if (this.state.countryId && this.state.city.length < 1) errors.city = "This field is required";
        }

        if(this.state.stepNumber === 3) {
            if (!this.state.avatar) errors.avatar = "This field is required";
        }

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

    onReset = () => {
        Object.keys(this.state).map(item => {
            return this.setState({[item]: ''})
        });

        this.setState({
            gender: 'Male',
            stepNumber: 1
        })
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    getCountries = (countries) => {
        return countries.map(item => {
            return <option key={item.id} id={item.id} value={item.id}>{item.name}</option>
        });
    };

    onChangeCountry = (e) => {
        const id = e.target.value;
        this.setState(() => ({
                countryId: id
            }),
            () => {this.getCities(cities)}
        )
    };

    getCities = (cities) => {
        const newCities=[];
        for (let key in cities) {
            if(cities[key].country === Number(this.state.countryId)) {
                newCities.push({
                    id: key,
                    name: cities[key].name
                });
            }
        }
        this.setState({cities: newCities});
    };

    onChangeFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            this.setState({
                avatar: e.target.result
            });
        };
        console.log(this.state.avatar)
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
                                value={this.state.countryId}
                                onChange={this.onChangeCountry}
                            >
                                <option value="">Select country</option>
                                {this.getCountries(countries)}
                            </select>
                            {this.state.errors.countryId ? <div className="invalid-feedback">{this.state.errors.countryId}</div> : null}
                        </div>
                        {this.state.countryId && <div className="form-group">
                            <label htmlFor="country">City</label>
                            <select
                                id="city"
                                className="form-control"
                                name="city"
                                value={this.state.city}
                                onChange={this.onChange}
                            >
                                <option value="">Select city</option>
                                {this.state.cities.map(item => {
                                    return <option key={item.id} value={item.name}>{item.name}</option>
                                })}
                            </select>
                            {this.state.errors.city ? <div className="invalid-feedback">{this.state.errors.city}</div> : null}
                        </div>}
                    </>}
                    {this.state.stepNumber === 3 &&
                        <div className="form-group">
                            <img
                                className="avatar"
                                src={this.state.avatar ? this.state.avatar : 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar-300x300.png'}
                                alt="Avatar"/>
                            <label htmlFor="avatar">Onload your photo</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="avatar"
                                name='avatar'
                                onChange={this.onChangeFile}
                            />
                            {this.state.errors.avatar ? <div className="invalid-feedback">{this.state.errors.avatar}</div> : null}
                        </div>
                    }
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
                    {this.state.stepNumber === 4 &&
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <img className="avatar" src={this.state.avatar} alt="Avatar"/>
                                </div>
                                <div className="col-8 d-flex align-items-center"><h3>{this.state.firstName} {this.state.lastName}</h3></div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <p><strong>Email: </strong>{this.state.email}</p>
                                    <p><strong>Mobile: </strong>{this.state.mobile}</p>
                                    <p><strong>Location: </strong>{this.state.countryId}, {this.state.city}</p>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary col-4"
                                            onClick={this.onReset}
                                        >Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </form>
            </div>
        );
    }
}
