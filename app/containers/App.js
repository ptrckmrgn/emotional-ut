import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { fetchInterviews } from '../actions/interviews';
import Interview from './Interview';
import InterviewList from './InterviewList';
import InterviewCreate from './InterviewCreate';

import Navigation from '../components/Navigation';
import LoadingPage from '../components/LoadingPage';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchInterviews();
    }

    render() {
        if (!this.props.interviews) {
            return (
                <LoadingPage />
            );
        }

        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route path='/interview/create' component={InterviewCreate} />
                        <Route path='/interview/:id' component={Interview} />
                        <Route path='/' component={InterviewList} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        interviews: state.interviews.list
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchInterviews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);