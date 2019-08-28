import React from 'react';

export default class Avatar extends React.Component {

    onChangeFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            this.props.onChange({
                target: {
                    name: 'avatar',
                    value: e.target.result
                }
            });
        };
    };

    render() {

        const {avatar, errors} = this.props;

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
                    onChange={this.onChangeFile}
                />
                {errors.avatar ? <div className="invalid-feedback">{errors.avatar}</div> : null}
            </div>
        )
    }
}