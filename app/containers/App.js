import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Firebase from 'firebase';

import { fetchInterviews } from '../actions/interviews';
import Interview from './Interview';
import Interviews from './Interviews';
import InterviewCreate from './InterviewCreate';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchInterviews();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/interview/create' component={InterviewCreate} />
                        <Route path='/interview/:id' component={Interview} />
                        <Route path='/' component={Interviews} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchInterviews }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);