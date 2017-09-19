import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import Chart from '../components/Chart';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            events: null
        };
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        // axios.get('test.json')
        axios.get('../../resources/test.json')
            .then((response) => {
                const data = JSON.parse(response.data.processingResult);
                this.setState({data});

                let events = {
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
                        events.anger.push({x: time, y: _.round(event[0].scores.anger * 100)});
                        events.contempt.push({x: time, y: _.round(event[0].scores.contempt * 100)});
                        events.disgust.push({x: time, y: _.round(event[0].scores.disgust * 100)});
                        events.fear.push({x: time, y: _.round(event[0].scores.fear * 100)});
                        events.happiness.push({x: time, y: _.round(event[0].scores.happiness * 100)});
                        events.neutral.push({x: time, y: _.round(event[0].scores.neutral * 100)});
                        events.sadness.push({x: time, y: _.round(event[0].scores.sadness * 100)});
                        events.surprise.push({x: time, y: _.round(event[0].scores.surprise * 100)});
                        time += (interval / timescale);
                    });
                });
                this.setState({events});
            });
    }

    render() {
        if (!this.state.events) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        return (
            <div>
                Emotional User Testing
                <div id="result">
                    <div id="chart-wrapper">
                        <Chart data={this.state.events} />
                    </div>
                    <div id="video-wrapper">
                        <iframe id="video" width="300" height="600" src="https://www.youtube.com/embed/23AHuCfHpbM?mute=1"></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;