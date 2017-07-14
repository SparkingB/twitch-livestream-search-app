import React from 'react';
import PropTypes from 'prop-types';
import { TWChannelItem } from './TWChannelItem';
import { TWChannelItemFake } from './TWChannelItemFake';
import { connect } from 'react-redux';
import * as TWActions from '../actions/TWActions';


class TWChannelList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const {
            moreDataRequest,
            requestStatus
        } = this.props;
        const {
            offset,
            limit
        } = requestStatus;
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) + 1700 >= scrollHeight;

        if(!requestStatus.waiting&&scrolledToBottom&&requestStatus.total>=offset){
            moreDataRequest && moreDataRequest(requestStatus.text,offset,limit);
        } 
    }

    makeFakeComponent(times) {
        let fakeComponents = []
        for (let i = 0; i < times; i++) {
            fakeComponents.push(<TWChannelItemFake key={i} />);
        }
        return fakeComponents;
    }

    render() {
        const {
            channels,
            changeViewMode
        } = this.props;

        const channelItems = channels.map(
            (channel) => (
                <TWChannelItem
                    key={channel.channel._id}
                    channel={channel}
                    changeViewMode={changeViewMode}
                />
            )
        );

        const fakeItemNum = 3 - channelItems.length % 3;
        const fakeItems = this.makeFakeComponent(fakeItemNum);
        const emptyChannelStr = <div className="empty-channel-str">Nobody play this game now</div>;

        return (<div className="channel-list"> {channelItems.length>0 ? [...channelItems,...fakeItems] : emptyChannelStr} </div>);
    }
}


TWChannelList.propTypes = {
    changeViewMode: PropTypes.func.isRequired,

    channels: PropTypes.arrayOf(PropTypes.object.isRequired),
    moreDataRequest: PropTypes.func.isRequired,
    requestStatus: PropTypes.object.isRequired
}

export default connect(
    (state) => ({
        channels: state.channels,
        requestStatus: state.requestStatus
    }),
    {
        moreDataRequest: TWActions.moreDataRequest,
    }
)(TWChannelList);