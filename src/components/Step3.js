import React from 'react';

const Step3 = (props) => {

    const {avatar, onChangeFile, errorsAvatar} = props;

    return (
        <div className="form-group">
            <img
                className="avatar"
                src={avatar ? avatar : 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar-300x300.png'}
                alt="Avatar"/>
            <label htmlFor="avatar">Onload your photo</label>
            <input
                type="file"
                className="form-control-file"
                id="avatar"
                name='avatar'
                onChange={onChangeFile}
            />
            {errorsAvatar ? <div className="invalid-feedback">{errorsAvatar}</div> : null}
        </div>
    )
};

export default Step3;