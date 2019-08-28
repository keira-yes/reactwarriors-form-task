import React from 'react';
import countries from "../data/countries";

export default class Output extends React.Component {
    render() {

        const {
            avatar,
            firstName,
            lastName,
            email,
            mobile,
            country,
            city,
            onReset

        } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img className="avatar" src={avatar} alt="Avatar"/>
                    </div>
                    <div className="col-8 d-flex align-items-center"><h3>{firstName} {lastName}</h3></div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p><strong>Email: </strong>{email}</p>
                        <p><strong>Mobile: </strong>{mobile}</p>
                        <p><strong>Location: </strong>
                            {countries.map(item => {
                                return (item.id === Number(country) ? item.name : '')
                            })},
                            {city}
                        </p>
                        <div className="d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary col-4"
                                onClick={onReset}
                            >Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}