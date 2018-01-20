import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createInterview, resetCreateInterview } from '../actions/interviews'
import LoadingPage from '../components/LoadingPage'

class InterviewCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            name: ""
        };

        this.onClickCreate = this.onClickCreate.bind(this);
    }

    onChangeName(name) {
        this.setState({ name });
    }

    onClickCreate() {
        this.props.createInterview(this.state.name);
        this.setState({ loading: true });
    }

    componentDidUpdate() {
        if (this.props.id) {
            this.props.history.push(`/interview/${this.props.id}`);
        }
    }

    componentWillUnmount() {
        this.props.resetCreateInterview();
    }

    render() {
        // if (this.state.loading) {
        //     return (
        //         <LoadingPage />
        //     );
        // }

        return (
            <div>
                <div className="field">
                    <label className="label">Interview Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Name"
                            onChange={event => this.onChangeName(event.target.value)}
                        />
                    </div>
                </div>
                {!this.state.loading ? (
                    <button
                        onClick={this.onClickCreate}
                        className="button is-primary"
                    >
                        Create
                    </button>
                ) : (
                    <button className="button is-primary is-loading">Create</button>
                )}
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