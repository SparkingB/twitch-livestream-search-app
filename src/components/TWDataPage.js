import React from 'react';
import PropTypes from 'prop-types';
import { TWHomePage } from './TWHomePage';
import TWChannelList from './TWChannelList';
import { TWVideo } from './TWVideo';


export class TWDataPage extends React.Component {

    render() {
        const {
            viewMode,
            loadingIcon,
            searchRequest,
            changeViewMode,
            updateRequestText
         } = this.props;

        const channelListView = (<TWChannelList 
                                    changeViewMode={changeViewMode}
                                />);
        const channelVideoView = (<TWVideo
                                    viewMode={viewMode}
                                    changeViewMode={changeViewMode}
                                />);

        return (
            <div>
                <TWHomePage 
                    loadingIcon={loadingIcon}
                    searchRequest={searchRequest}
                    updateRequestText={updateRequestText}
                    homepageClassName={viewMode.mode === 'list' ? "top-homepage" : "top-homepage cancelfix"}
                    titleClassName="top-homepage-title"
                    searchBarClassName="top-homepage-searchbar"
                    loadingIconClassName="top-homepage-loadingicon"
                    autoFocus={false}
                />
                {viewMode.mode === 'list' ? 
                    <div className="datapage">{channelListView}</div>: 
                    <div className="datapage" style={{marginTop: 0 }}>{channelVideoView}</div>}
            </div>
        );
    }
}


TWDataPage.propTypes = {
    viewMode: PropTypes.object.isRequired,
    loadingIcon: PropTypes.bool.isRequired,
    searchRequest: PropTypes.func.isRequired,
    changeViewMode: PropTypes.func.isRequired
}