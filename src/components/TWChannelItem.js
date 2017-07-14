import React from 'react';
import PropTypes from 'prop-types';


export class TWChannelItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        const {
            channel,
            changeViewMode
         } = this.props;

        changeViewMode('video', channel.channel.name);
    }

    render() {
        const {
            channel
         } = this.props;

        return (
            <div className="channel-item">
                <div className="item-top" onClick={this.handleOnClick}>
                    <div className="preview-placeholder">
                        <img src={channel.preview.medium} alt="" />
                    </div>
                </div>
                <div className="item-bottom">
                    <div className="logo-placeholder">
                        <img src={channel.channel.logo} alt=""/>
                    </div>
                    <div className="item-data">
                        <div className="item-status">{channel.channel.status}</div>
                        <div className="item-user">
                            <span>{channel.viewers} 個觀眾在看 </span>
                            <span className="item-user-id">{channel.channel.display_name}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


TWChannelItem.propTypes = {
    channel: PropTypes.object.isRequired,
    changeViewMode: PropTypes.func.isRequired
}
