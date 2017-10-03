import _ from 'lodash';
import React, { Component } from 'react';
import Firebase from 'firebase';

import Chart from '../components/Chart';

class Emotion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.status == 'Succeeded') {
            const data = JSON.parse(nextProps.data.processingResult);
            this.processData(data);
        }
    }

    processData(data) {
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
    }

    render() {
        if (this.props.isFetching) {
            return (
                <div>Loading...</div>
            );
        }
        if (this.state.results) {
            return (
                <Chart data={this.state.results} />
            );
        }
        else {
            return null;
        }
    }
}

export default Emotion;