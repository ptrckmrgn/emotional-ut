import _ from 'lodash';
import React, { Component } from 'react';

class Video extends Component {
    resizeVideo(video) {
        const wrapper = document.querySelector('.video-wrapper');
        const ratio = _.min([wrapper.offsetWidth / video.videoWidth,
            wrapper.offsetHeight / video.videoHeight]);

        video.style.width = ratio * video.videoWidth + 'px';
        video.style.height = ratio * video.videoHeight + 'px';
    }

    render() {
        return (
            <div className='video-wrapper'>
                <video width="200" height="200" controls onLoadedMetadata={event => this.resizeVideo(event.target)}>
                    <source src={this.props.url} type="video/mp4"/>
                    Your browser doesn't support playback. Try using Chrome.
                </video>
            </div>
        )
    }
}

export default Video;