import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('../../resources/test.json')
            .then((response) => {
                const data = JSON.parse(response.data.processingResult);
                this.setState({data});

                console.log(data);
                let events = [];
                _.map(data.fragments, (fragment) => {
                    _.map(fragment.events, (event) => {
                        events.push(event[0].scores);
                    });
                });
                console.log(events);
            });
    }

    render() {
        if (!this.state.data) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        return (
            <div>
                <Chart data={} />
            </div>
        );
    }
}

export default App;