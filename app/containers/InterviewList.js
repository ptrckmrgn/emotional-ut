import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import List from '../components/InterviewList/List';
import LoadingPage from '../components/LoadingPage';

class Interviews extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.interviews) {
            return (
                <LoadingPage />
            );
        }
        return (
            <div>
                <List interviews={this.props.interviews}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        interviews: state.interviews.list
    };
}

export default connect(mapStateToProps)(Interviews);