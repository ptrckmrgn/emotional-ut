import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { deleteInterview } from '../actions/interviews';
import { processVideo, checkStatus } from '../actions/emotion';

import Video from './Video';
import Results from './Results';
import PageLoading from '../components/PageLoading'

class Interview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            results: null,
            videoFaceURL: '',
            videoScreenURL: '',
        };

        this.deleteInterview = this.deleteInterview.bind(this);
        this.processVideo = this.processVideo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.emotion.isFetching) {
        }
    }

    componentWillUpdate(nextProps, nextState) {
        // if (nextProps.interview &&
        //         this.props.interview.videoFace != nextProps.interview.videoFace) {
        //     this.props.processVideo(nextProps.interview.videoFace);
        // }

        if (nextProps.emotion.isFetching) {
            this.startPoll();
        }

        // if (nextProps.emotion.operation &&
        //         nextProps.emotion.operation != this.props.emotion.operation) {
        //     this.startPoll();
        // }

        // if (nextProps.emotion.data.status != 'Succeeded') {
        //     clearTimeout(this.timeout);
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.props.emotion.operation &&
        //         this.props.emotion.operation != prevProps.emotion.operation) {
        //     this.startPoll();
        // }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    startPoll() {
        this.timeout = setTimeout(() => this.props.checkStatus(this.props.emotion.operation), 6000);
    }

    processVideo(url) {
        this.props.processVideo(url);
    }

    // setFaceURL(videoFaceURL) {
    //     this.setState({ videoFaceURL });
    //
    // }
    //
    // setScreenURL(videoScreenURL) {
    //     this.setState({ videoScreenURL });
    //     Firebase.database().ref('experiments/test').set({
    //         video_screen: videoScreenURL
    //     });
    // }

    deleteInterview(id) {
        this.props.deleteInterview(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { id } = this.props.match.params;
        const { interview } = this.props;

        if (!interview) {
            return (
                <PageLoading />
            );
        }
        return (
            <div>
                <button onClick={() => this.deleteInterview(id)}>DELETE</button>
                <Link to='/'>BACK</Link>
                <div className="container">
                    <div id="video-face">
                        <Video
                            id={id}
                            type='videoFace'
                            url={this.props.interview.videoFace}
                            processVideo={this.processVideo}
                        />
                    </div>
                    <div id="video-screen">
                        <Video
                            id={id}
                            type='videoScreen'
                            url={this.props.interview.videoScreen}
                            processVideo={this.processVideo}
                        />
                    </div>
                    <div id="results">
                        <Results
                            id={id}
                            results={this.props.interview.results}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let interview = null;

    if (state.interviews.interviews) {
        interview = state.interviews.interviews[ownProps.match.params.id];
    }

    return {
        interview: interview,
        emotion: state.emotion
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ deleteInterview, processVideo, checkStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Interview);