import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import _ from 'lodash';
import Firebase from 'firebase';

import { processVideo, checkStatus } from '../actions';
import Chart from '../components/Chart';
import Video from '../components/Video';
import UploadFile from './UploadFile';
import Emotion from './Emotion';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            results: null,
            videoFaceURL: '',
            videoScreenURL: '',

        };

        this.setFaceURL = this.setFaceURL.bind(this);
        this.setScreenURL = this.setScreenURL.bind(this);
    }

    startPoll() {
        console.log('polling');
        this.timeout = setTimeout(() => this.props.checkStatus(this.props.emotion.operation), 7000);
    }

    componentDidMount() {
        const config = {
            apiKey: 'AIzaSyCzsSGWe-Y455OMj2XbGkY-qZMWj3YERsU',
            authDomain: 'emotional-ut.firebaseapp.com',
            databaseURL: 'https://emotional-ut.firebaseio.com/',
            storageBucket: 'emotional-ut.appspot.com'
        };
        Firebase.initializeApp(config);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.videoFaceURL != nextState.videoFaceURL) {
            this.props.processVideo(nextState.videoFaceURL);
        }

        if (nextProps.emotion.operation &&
                nextProps.emotion.operation != this.props.emotion.operation) {
            console.log(nextProps.emotion.operation);
            this.startPoll();
        }

        if (nextProps.emotion.data.status != 'Succeeded') {
            console.log(nextProps.emotion.data.status);
            clearTimeout(this.timeout);
            this.startPoll();
        }
    }

    setFaceURL(videoFaceURL) {
        this.setState({ videoFaceURL });
    }

    setScreenURL(videoScreenURL) {
        this.setState({ videoScreenURL });
    }

    render() {
        // if (!this.state.results) {
        //     return (
        //         <div>
        //             Loading...
        //         </div>
        //     );
        // }

        return (
            <div>
                <div className="container">
                    <div id="video-face">
                        {!this.state.videoFaceURL ? (
                            <UploadFile setURL={this.setFaceURL} />
                        ) : (
                            <Video url={this.state.videoFaceURL} />
                        )}
                    </div>
                    <div id="video-screen">
                        {!this.state.videoScreenURL ? (
                            <UploadFile setURL={this.setScreenURL} />
                        ) : (
                            <Video url={this.state.videoScreenURL} />
                        )}
                    </div>
                    <div id="results">
                        <Emotion
                            isFetching={this.props.emotion.isFetching}
                            data={this.props.emotion.data}
                        />
                        {this.props.emotion.operation &&
                            <div>
                                {this.props.emotion.data.status}/
                                {this.props.emotion.data.progress}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        emotion: state.emotion
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ processVideo, checkStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);