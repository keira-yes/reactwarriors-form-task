import React from "react";
import Steps from './Steps';
import Basic from './Basic';
import Contacts from './Contacts';
import Avatar from './Avatar';
import Output from './Output';
import ButtonsNavigation from './ButtonsNavigation';

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
            country: 1,
            city: '',
            avatar: '',
            step: 1,
            errors: {
                firstName: '',
                lastName: '',
                password: '',
                repeatPassword: '',
                email: '',
                mobile: '',
                country: '',
                city: '',
                avatar: ''
            }
        };
    }

    validateFields = () => {
        const {
            step,
            firstName,
            lastName,
            password,
            repeatPassword,
            email,
            mobile,
            country,
            city,
            avatar
        } = this.state;

        const errors = {};

        if(step === 1) {
            if (firstName.length < 5) errors.firstName = "Must be 5 characters or more";
            if(lastName.length < 5) errors.lastName = "Must be 5 characters or more";
            if(password.length < 6) errors.password = "Must be 6 characters or more";
            if(repeatPassword !== password) errors.repeatPassword = "Must be equal password";
        }
        if(step === 2) {
            if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) errors.email = "Invalid email address";
            if (!mobile.match(/^\+(?:[0-9-] ?){6,14}[0-9]$/)) errors.mobile = "Your number doesn't match +3801111111";
            if (!country) errors.country = "This field is required";
            if (country && city.length < 1) errors.city = "This field is required";
        }

        if(step === 3) {
            if (!avatar) errors.avatar = "This field is required";
        }

        return errors;
    };

    onSubmit = (e) => {
        e.preventDefault();

        const errors = this.validateFields();

        if (Object.keys(errors).length > 0) {
            this.setState({errors});
        } else {
            this.setState({
                errors: {},
                step: this.state.step + 1
            });
        }

    };

    onPrevious = () => {
        this.setState({
            step: this.state.step - 1
        });
    };

    onReset = () => {
        this.setState({
            firstName: '',
            lastName: '',
            password: '',
            repeatPassword: '',
            gender: 'Male',
            email: '',
            mobile: '',
            country: 1,
            city: '',
            avatar: '',
            step: 1
        })
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        const {
            step,
            firstName,
            lastName,
            password,
            repeatPassword,
            gender,
            email,
            mobile,
            country,
            city,
            avatar,
            errors
        } = this.state;
        return (
            <div className="form-container card">
                <form className="form card-body">
                    <Steps
                        step={this.state.step}
                        onChange={this.onChange}
                    />
                    {step === 1 &&
                    <Basic
                        firstname={firstName}
                        lastName={lastName}
                        password={password}
                        repeatPassword={repeatPassword}
                        gender={gender}
                        onChange={this.onChange}
                        errors={errors}
                    />}
                    {step === 2 &&
                    <Contacts
                        email={email}
                        mobile={mobile}
                        country={country}
                        city={city}
                        onChange={this.onChange}
                        errors={errors}
                    />
                    }
                    {step === 3 &&
                    <Avatar
                        avatar={avatar}
                        onChange={this.onChange}
                        errors={errors}
                    />
                    }
                    {step < 4 &&
                    <ButtonsNavigation
                        step={step}
                        onPrevious={this.onPrevious}
                        onNext={this.onSubmit}
                    />
                    }
                    {step === 4 &&
                    <Output
                        avatar={avatar}
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        mobile={mobile}
                        country={country}
                        city={city}
                        onReset={this.onReset}
                    />
                    }
                </form>
            </div>
        );
    }
}
