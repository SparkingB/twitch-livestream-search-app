import React from 'react';
import PropTypes from 'prop-types';


export class TWPic extends React.Component {
    render() {
        const { 
            picPath,
            picAlt,
            loadingIconClassName
        } = this.props;
        
        return (
            <div>
                <img
                    className={loadingIconClassName} 
                    src={picPath} 
                    alt={picAlt} 
                />
            </div>
        );
    }
}


TWPic.propTypes = {
    picPath: PropTypes.string.isRequired,
    picAlt: PropTypes.string.isRequired,
    loadingIconClassName: PropTypes.string.isRequired
}
