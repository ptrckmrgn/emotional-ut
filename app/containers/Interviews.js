import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import PageLoading from '../components/PageLoading'

class Interviews extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    mapInterviews() {
        return _.map(this.props.interviews, (interview, id) => {
            return (
                <li key={id}>
                    <Link to={`/interview/${id}`}>{interview.name}</Link>
                </li>
            );
        });
    }

    render() {
        if (!this.props.interviews) {
            return (
                <PageLoading />
            );
        }
        return (
            <div>
                <Link to="/interview/create">CREATE</Link>
                <ul className="list-group">
                    {this.mapInterviews()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        interviews: state.interviews.interviews
    };
}

export default connect(mapStateToProps)(Interviews);