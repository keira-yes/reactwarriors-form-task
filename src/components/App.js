import React from "react";
import {steps} from '../data/steps';
import countries from '../data/countries';
import cities from "../data/cities";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Buttons from './Buttons';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            repeatPassword: '',
            gender: 'Male',
            email: '',
            mobile: '',
            countryId: 1,
            city: '',
            avatar: '',
            errors: {},
            stepNumber: 1
        };
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
            return <option key={item.id} value={item.id}>{item.name}</option>
        });
    };

    onChangeCountry = (e) => {
        const id = e.target.value;
        this.setState({
            countryId: id,
            city: ''
        })
    };

    getCities = (cities) => {
        const newCities = [];
        for (let key in cities) {
            if(cities[key].country === Number(this.state.countryId)) {
                newCities.push(<option key={key} value={cities[key].name}>{cities[key].name}</option>)
            }
        }
        return newCities.map(item => {return item})
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
                    {this.state.stepNumber === 1 &&
                    <Step1
                        firstname={this.state.firstName}
                        lastName={this.state.lastName}
                        password={this.state.password}
                        repeatPassword={this.state.repeatPassword}
                        gender={this.state.gender}
                        onChange={this.onChange}
                        errorsFirstName={this.state.errors.firstName}
                        errorsLastName={this.state.errors.lastName}
                        errorsPassword={this.state.errors.password}
                        errorsRepeatPassword={this.state.errors.repeatPassword}
                    />}
                    {this.state.stepNumber === 2 &&
                    <Step2
                        email={this.state.email}
                        mobile={this.state.mobile}
                        countryId={this.state.countryId}
                        city={this.state.city}
                        onChange={this.onChange}
                        getCountries={this.getCountries(countries)}
                        onChangeCountry={this.onChangeCountry}
                        getCities={this.getCities(cities)}
                        errorsEmail={this.state.errors.email}
                        errorsMobile={this.state.errors.mobile}
                        errorsCountryId={this.state.errors.countryId}
                        errorsCity={this.state.errors.city}
                    />
                    }
                    {this.state.stepNumber === 3 &&
                    <Step3
                        avatar={this.state.avatar}
                        onChangeFile={this.onChangeFile}
                        errorsAvatar={this.state.errors.avatar}
                    />
                    }
                    {this.state.stepNumber < 4 &&
                    <Buttons
                        stepNumber={this.state.stepNumber}
                        onComeBack={this.onComeBack}
                        onValidate={this.onValidate}
                    />
                    }
                    {this.state.stepNumber === 4 &&
                    <Step4
                        avatar={this.state.avatar}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        mobile={this.state.mobile}
                        countryId={this.state.countryId}
                        city={this.state.city}
                        onReset={this.onReset}
                    />
                    }
                </form>
            </div>
        );
    }
}
