import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import axios from 'axios';

import {updateInterview} from '../actions/interviews';

import Unprocessed from '../components/Results/Unprocessed';
import Processing from '../components/Results/Processing';
import Chart0 from '../components/Results/Chart0';
import Chart1 from '../components/Results/Chart1';

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            data: null,
            mode: 0
        };
    }

    componentDidMount() {
        if (this.props.results) {
            this.getResults(this.props.results);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.status == 'PROCESSING' && nextProps.status == 'SUCCEEDED') {
            this.getResults(this.props.results);
        }
    }

    getResults(url) {
        axios({method: 'get', url}).then(response => {
            console.log(response.data);
            this.processData(response.data);
            this.setState({results: response.data});
        });
    }

    processData(results) {
        let data = new Array(results.facesDetected.length).fill().map(() => {
            return {
                anger: [],
                contempt: [],
                disgust: [],
                fear: [],
                happiness: [],
                neutral: [],
                sadness: [],
                surprise: []
            }
        });
        const timescale = results.timescale;
        let time = 0;
        let interval = 0;

        _.map(results.fragments, fragment => {
            time = fragment.start / timescale;
            interval = fragment.interval;
            _.map(fragment.events, event => {
                time = _.round(time, 2);
                _.map(event, face => {
                    data[face.id].anger.push({
                        x: time,
                        y: _.round(face.scores.anger * 100)
                    });
                    data[face.id].contempt.push({
                        x: time,
                        y: _.round(face.scores.contempt * 100)
                    });
                    data[face.id].disgust.push({
                        x: time,
                        y: _.round(face.scores.disgust * 100)
                    });
                    data[face.id].fear.push({
                        x: time,
                        y: _.round(face.scores.fear * 100)
                    });
                    data[face.id].happiness.push({
                        x: time,
                        y: _.round(face.scores.happiness * 100)
                    });
                    data[face.id].neutral.push({
                        x: time,
                        y: _.round(face.scores.neutral * 100)
                    });
                    data[face.id].sadness.push({
                        x: time,
                        y: _.round(face.scores.sadness * 100)
                    });
                    data[face.id].surprise.push({
                        x: time,
                        y: _.round(face.scores.surprise * 100)
                    });
                });
                time += (interval / timescale);
            });
        });

        this.setState({data});
    }

    render() {
        switch (this.props.status) {
            case 'UNPROCESSED':
                return (<Unprocessed/>);
            case 'PROCESSING':
                return (<Processing progress={this.props.progress}/>);
            case 'SUCCEEDED':
                if (this.state.results) {
                    return (
                        <div>
                            <Chart0 id="Face0" data={this.state.data[0]}/>
                            <Chart0 id="Face1" data={this.state.data[1]}/>
                            <Chart0 id="Face2" data={this.state.data[2]}/>
                            <Chart0 id="Face3" data={this.state.data[3]}/>
                            <Chart0 id="Face4" data={this.state.data[4]}/>
                            <Chart0 id="Face5" data={this.state.data[5]}/>
                            <Chart0 id="Face6" data={this.state.data[6]}/>
                        </div>
                    );
                }
                // TODO: 'FAILED'
            default:
                return null;
        }
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateInterview
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Results);