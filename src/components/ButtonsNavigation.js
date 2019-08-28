import React from 'react';

export default class ButtonsNavigation extends React.Component {

    render() {
        const {step, onPrevious, onNext} = this.props;

        return (
            <div className='d-flex justify-content-center'>
                <button
                    type="button"
                    className="btn btn-outline-secondary col-4 mr-3"
                    disabled={step === 1}
                    onClick={onPrevious}
                >Previous
                </button>
                <button
                    type="submit"
                    className="btn btn-outline-secondary col-4"
                    onClick={onNext}
                >Next
                </button>
            </div>
        )
    }
}