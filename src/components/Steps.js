import React from 'react';
import {steps} from "../data/steps";

export default class Steps extends React.Component {

    render() {
        const {step, onChange} = this.props;

        return (
            <div className="steps d-flex justify-content-between">
                {steps.map(item => (
                    <div
                        key={item.id}
                        className={'steps-item' + (step === item.id ? ' active' : '') + (step > item.id ? ' complete' : '')}
                        onClick={() =>
                            step > item.id ?
                                onChange({
                                    target: {
                                        name: 'step',
                                        value: item.id
                                    }
                                }) : ''}
                    >
                        <span>{item.id}</span>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        )
    }
}