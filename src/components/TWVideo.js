import React from 'react';
import PropTypes from 'prop-types';


export class TWVideo extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = { value: true };

        this.refresh = this.refresh.bind(this);
        this.back = this.back.bind(this);
    }

    refresh() {
        this.setState({ value: !this.state.value });
        setTimeout(() => this.setState({ value: !this.state.value }), 0);
    }

    back(){
        const { changeViewMode } = this.props;
        changeViewMode && changeViewMode('list')
    }

    render() {
        const { viewMode } = this.props;
        let videoHeight = 600, videoWeight = 800;
        if (window.screen.width <= 1280) {
            videoHeight = 480;
            videoWeight = 640;
        }
        return (
            <div className="video-container">
                <div className="btn">
                    <div className="back" onClick={this.back}>
                        <img src="http://i.imgur.com/MURr3gk.png" alt=""/>
                    </div>
                    <div className="refresh" onClick={this.refresh}>
                        <img src="http://i.imgur.com/at1QzNy.png" alt=""/>
                    </div>
                </div>
                <div className="iframes-container">
                    <div style={{width: videoWeight, height: videoHeight, background: "black"}}>
                        <img src="./assets/loading.gif" alt=""/>
                        {
                            this.state.value ?
                                <iframe
                                    title="streaming"
                                    src={`http://player.twitch.tv/?channel=${viewMode.url}`}
                                    height={videoHeight}
                                    width={videoWeight}
                                    frameBorder="0"
                                    scrolling="no"
                                    allowFullScreen="true">
                                </iframe> :
                                <div className="fakeScreen">
                                </div>
                        }
                    </div>
                    <div style={{width: videoWeight * 0.6, height: videoHeight, background: "white"}}>
                        <img src="./assets/loading.gif" alt=""/>
                        <iframe
                            title="chatroom"
                            frameBorder="0"
                            scrolling="no"
                            id={viewMode.url}
                            src={`http://www.twitch.tv/${viewMode.url}/chat`}
                            height={videoHeight}
                            width={videoWeight * 0.6}>
                        </iframe>
                    </div>
                </div>
            </div>
        );
    }
}


TWVideo.propTypes = {
    viewMode: PropTypes.object.isRequired,
    changeViewMode: PropTypes.func.isRequired
}