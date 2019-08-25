import React from 'react';

const Buttons = (props) => {

    const {stepNumber, onComeBack, onValidate} = props;

    return (
        <div className='d-flex justify-content-center'>
            <button
                type="button"
                className="btn btn-outline-secondary col-4 mr-3"
                disabled={stepNumber === 1}
                onClick={onComeBack}
            >Previous
            </button>
            <button
                type="submit"
                className="btn btn-outline-secondary col-4"
                onClick={onValidate}
            >Next
            </button>
        </div>
    )
};

export default Buttons;