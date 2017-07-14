import React from 'react';
import PropTypes from 'prop-types';


export class TWTitle extends React.Component {
    render() {
        const { titleClassName } = this.props;
        return (
            <div className={titleClassName}>
                Twitch Live Channel Search
            </div>
        );
    }
}

TWTitle.propTypes = {
    titleClassName: PropTypes.string.isRequired
}