import React from 'react';
import PropTypes from 'prop-types';
import { TWTitle } from './TWTitle';
import TWSearchBar from './TWSearchBar';
import { TWPic } from './TWPic';


export class TWHomePage extends React.Component {
    render() {
        const {
            searchRequest,
            loadingIcon,
            titleClassName,
            homepageClassName,
            searchBarClassName,
            loadingIconClassName,
            autoFocus
        } = this.props;

        return (
            <div className={homepageClassName}>
                <TWTitle 
                    titleClassName={titleClassName}
                />
                <TWSearchBar
                    searchBarClassName={searchBarClassName}
                    autoFocus={autoFocus}
                    searchRequest={searchRequest}
                />
                {loadingIcon ? (<TWPic
                                    loadingIconClassName={loadingIconClassName}
                                    picPath="./assets/loading.gif"
                                    picAlt="loading"
                               />) : 
                               (<div className={loadingIconClassName}>
                               </div>)
                             }
            </div>
        );
    }
}


TWHomePage.propTypes = {
    searchRequest: PropTypes.func.isRequired,
    loadingIcon: PropTypes.bool.isRequired,
    titleClassName: PropTypes.string.isRequired,
    homepageClassName: PropTypes.string.isRequired,
    searchBarClassName: PropTypes.string.isRequired,
    loadingIconClassName: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool.isRequired
}
