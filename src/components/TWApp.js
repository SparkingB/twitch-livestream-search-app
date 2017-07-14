import React from 'react';
import { connect } from 'react-redux';
import { TWHomePage } from './TWHomePage';
import { TWDataPage } from './TWDataPage';
import * as TWActions from '../actions/TWActions';


class TWApp extends React.Component {

    render() {
        const {
            homePage
         } = this.props;

        return homePage ? this.renderHomePage() : this.renderDataPage()
                
    }

    renderHomePage() {
        const {
            loadingIcon,
            firstSearch,
         } = this.props;

        return (
            <div className="homepage-container">
                <TWHomePage
                    homepageClassName="homepage"
                    titleClassName="homepage-title"
                    searchBarClassName="homepage-searchbar"
                    loadingIconClassName="homepage-loadingicon"
                    loadingIcon={loadingIcon}
                    searchRequest={firstSearch}
                    autoFocus={true}
                />
            </div>
        );
    }

    renderDataPage() {
        const {
            viewMode,
            loadingIcon,
            searchRequest,
            changeViewMode,
         } = this.props;

        return (
            <div className="whole-page-container">
                <TWDataPage
                    viewMode={viewMode}
                    loadingIcon={loadingIcon}
                    searchRequest={searchRequest}
                    changeViewMode={changeViewMode}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        homePage: state.homePage,
        viewMode: state.viewMode,
        loadingIcon: state.loadingIcon,
    }),
    {
        firstSearch: TWActions.firstSearch,
        searchRequest: TWActions.searchRequest,
        changeViewMode: TWActions.changeViewMode,
    }
)(TWApp);
