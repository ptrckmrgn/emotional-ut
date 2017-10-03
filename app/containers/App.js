import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Firebase from 'firebase';

import Chart from '../components/Chart';
import Video from '../components/Video';
import UploadFile from './UploadFile';

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

    componentDidMount() {
        this.getData();

        const config = {
            apiKey: 'AIzaSyCzsSGWe-Y455OMj2XbGkY-qZMWj3YERsU',
            authDomain: 'emotional-ut.firebaseapp.com',
            databaseURL: 'https://emotional-ut.firebaseio.com/',
            storageBucket: 'emotional-ut.appspot.com'
        };
        Firebase.initializeApp(config);
    }

    getData() {
        // axios.get('test.json')
        axios.get('../../resources/test.json')
            .then((response) => {
                const data = JSON.parse(response.data.processingResult);
                this.setState({data});

                let results = {
                    anger: [],
                    contempt: [],
                    disgust: [],
                    fear: [],
                    happiness: [],
                    neutral: [],
                    sadness: [],
                    surprise: [],
                };
                let time = 0;
                const timescale = data.timescale;
                _.map(data.fragments, fragment => {
                    const interval = fragment.interval;
                    _.map(fragment.events, event => {
                        time = _.round(time, 2);
                        results.anger.push({x: time, y: _.round(event[0].scores.anger * 100)});
                        results.contempt.push({x: time, y: _.round(event[0].scores.contempt * 100)});
                        results.disgust.push({x: time, y: _.round(event[0].scores.disgust * 100)});
                        results.fear.push({x: time, y: _.round(event[0].scores.fear * 100)});
                        results.happiness.push({x: time, y: _.round(event[0].scores.happiness * 100)});
                        results.neutral.push({x: time, y: _.round(event[0].scores.neutral * 100)});
                        results.sadness.push({x: time, y: _.round(event[0].scores.sadness * 100)});
                        results.surprise.push({x: time, y: _.round(event[0].scores.surprise * 100)});
                        time += (interval / timescale);
                    });
                });
                this.setState({results});
            });
    }

    setFaceURL(videoFaceURL) {
        this.setState({ videoFaceURL });
    }

    setScreenURL(videoScreenURL) {
        this.setState({ videoScreenURL });
    }

    render() {
        if (!this.state.results) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

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
                        {this.state.results &&
                            <Chart data={this.state.results} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;