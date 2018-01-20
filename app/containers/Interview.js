import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Firebase from 'firebase';
import 'firebase/firestore';
import axios from 'axios'

import { updateInterview, deleteInterview } from '../actions/interviews';
// import { processVideo, checkStatus, setStatus } from '../actions/emotion';

import uploadFile from '../utils/uploadFile';

import Video from './Video';
import Results from './Results';
import LoadingPage from '../components/LoadingPage'

const BASE_URL = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/';
const KEY = '912bb25e231e4a85927d92635c3a9cb0';

class Interview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            progress: 0,
            results: null
        };

        this.processVideo = this.processVideo.bind(this);
        this.deleteInterview = this.deleteInterview.bind(this);
    }

    componentDidMount() {
        switch (this.props.interview.status) {
            case 'UNPROCESSED':
                if (this.props.interview.videoFace) {
                    this.processVideo(this.props.interview.videoFace);
                }
                break;
            case 'PROCESSING':
                console.log('processing');
                this.checkStatus(this.props.interview.operation);
                break;
            case 'SUCCEEDED':
                this.setState({ results: this.props.interview.results });
                break;
            // TODO: 'FAILED'
        }
    }

    processVideo(url) {
        // return null;
        // TODO: limit calls
        const PARAMS = 'recognizeinvideo?outputStyle=perFrame';
        let result = null;

        axios({
            method: 'post',
            url: BASE_URL + PARAMS,
            headers: { 'Ocp-Apim-Subscription-Key': KEY },
            data: { url: url }
        }).then(response => {
            Firebase.firestore().collection('interviews').doc(this.state.id).update({
                modified: _.now(),
                status: 'PROCESSING',
                operation: response.headers['operation-location']
            }).then(() => {
                this.checkStatus(response.headers['operation-location']);
            });
        });
    }

    checkStatus(location) {
        console.log('checking');
        // TODO: limit calls
        axios({
            method: 'get',
            url: location,
            headers: { 'Ocp-Apim-Subscription-Key': KEY }
        }).then(response => {
            if (response.data.status == 'Succeeded') {
                console.log('succeeded', response);
                // this.props.updateInterview(this.state.id, {
                //     status: 'SUCCEEDED',
                //     results: response.data.processingResult
                // });
                const blobResults = new File([response.data.processingResult], { type: 'text/plain' });
                console.log(blobResults);
                const uploadTask = uploadFile(this.state.id, 'results', blobResults, 'txt');
                uploadTask.on('state_changed', snapshot => {}, error => {}, () => {
                    this.props.updateInterview(this.state.id, {
                        status: 'SUCCEEDED',
                        results: uploadTask.snapshot.downloadURL
                    });
                });

                // this.props.updateInterview(this.state.id, 'status', 'SUCCEEDED');
                // this.props.updateInterview(this.state.id, 'results', response.data.processingResult);
                // this.setState({ results: response.data.processingResult });
            }
            else {
                const progress = response.data.progress || 0;
                this.setState({ progress });
                this.timeout = setTimeout(() => this.checkStatus(location), 10000);
            }
        }).catch(error => {
            switch (error.response.status) {
                case 404: // Operation not found, re-process
                    this.processVideo(this.props.interview.videoFace);
                    break;
                case 429: // Rate limit hit, slow down
                    this.timeout = setTimeout(() => this.checkStatus(location), 60000);
                    break;
                default:
                    console.log(error.response.status, 'Bad response');
            }
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    deleteInterview(event) {
        event.target.classList.add('is-loading');
        this.props.deleteInterview(this.state.id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        if (!this.props.interview) {
            return (
                <LoadingPage />
            );
        }
        return (
            <div>
                <Link to='/' className="button is-secondary">BACK</Link>
                <button onClick={this.deleteInterview} className="button is-danger">DELETE</button>
                <div className="container">
                    <div id="video-face">
                        <Video
                            id={this.state.id}
                            type='videoFace'
                            url={this.props.interview.videoFace}
                            processVideo={this.processVideo}
                        />
                    </div>
                    <div id="video-screen">
                        <Video
                            id={this.state.id}
                            type='videoScreen'
                            url={this.props.interview.videoScreen}
                        />
                    </div>
                    <div id="results">
                        <Results
                            id={this.state.id}
                            status={this.props.interview.status}
                            progress={this.state.progress}
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

    if (state.interviews.list) {
        interview = state.interviews.list[ownProps.match.params.id];
    }

    return {
        interview: interview,
        // emotion: state.emotion
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateInterview,
        deleteInterview,
        // processVideo,
        // checkStatus,
        // setStatus
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Interview);