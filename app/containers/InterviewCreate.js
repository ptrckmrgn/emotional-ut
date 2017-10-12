import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createInterview, resetCreateInterview } from '../actions/interviews'
import PageLoading from '../components/PageLoading'

class InterviewCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            name: ""
        };

        this.onClickCreate = this.onClickCreate.bind(this);
    }

    componentDidMount() {
        // this.props.createInterview();
    }

    componentDidUpdate() {
        if (this.props.id) {
            this.props.history.push(`/interview/${this.props.id}`);
        }
    }

    componentWillUnmount() {
        this.props.resetCreateInterview();
    }

    onChangeName(name) {
        this.setState({ name });
    }

    onClickCreate() {
        this.props.createInterview(this.state.name);
        this.setState({ loading: true });
    }

    render() {
        if (this.state.loading) {
            return (
                <PageLoading />
            );
        }

        return (
            <div>
                <label>Interview Name</label>
                <input
                    type="text"
                    onChange={event => this.onChangeName(event.target.value)}
                />
                <button onClick={this.onClickCreate}>CREATE</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.interviews.createInterview
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ createInterview, resetCreateInterview }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewCreate);