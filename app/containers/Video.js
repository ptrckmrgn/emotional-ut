import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Firebase from 'firebase';

import { updateInterview } from '../actions/interviews';

import Upload from '../components/Upload';
import Player from '../components/Player';

class Video extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadTask: null,
            running: false,
            transferred: 0,
            totalSize: 0,
            progress: 0,
            error: '',
        };

        this.uploadFile = this.uploadFile.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    uploadFile(file) {
        if (file) {
            if (file.type != 'video/mp4'
                    && file.type != 'video/quicktime'
                    && file.type != 'video/x-ms-wmv') {
                const error = 'File must be an MP4, MOV, or WMV';
                this.setState({ error });
            }
            else {
                const extension = file.name.split('.').pop();
                const uploadTask = Firebase.storage().ref()
                    .child(`${this.props.id}-${this.props.type}.${extension}`)
                    .put(file);

                this.setState({ uploadTask });

                uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        const transferred = _.round(snapshot.bytesTransferred / 1000000);
                        const totalSize = _.round(snapshot.totalBytes / 1000000);
                        const progress = _.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                        this.setState({ transferred, totalSize, progress });

                        switch (snapshot.state) {
                            case Firebase.storage.TaskState.PAUSED: // or 'paused'
                                break;
                            case Firebase.storage.TaskState.RUNNING: // or 'running'
                                this.setState({ running: true });
                            break;
                        }
                    }, error => {
                        // TODO: implement errors properly
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                this.setState({ error: error.code });
                                break;
                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                        this.setState({ running: false });
                    }, () => {
                        this.props.updateInterview(
                            this.props.id,
                            this.props.type,
                            uploadTask.snapshot.downloadURL
                        );
                        this.props.processVideo(uploadTask.snapshot.downloadURL);
                    }
                );
            }
        }
    }

    onCancel() {
        this.state.uploadTask.cancel();
    }

    render() {
        if (this.props.url) {
            return (
                <Player url={this.props.url}/>
            );
        }
        else {
            return (
                <Upload
                    running={this.state.running}
                    transferred={this.state.transferred}
                    totalSize={this.state.totalSize}
                    progress={this.state.progress}
                    error={this.state.error}

                    uploadFile={this.uploadFile}
                    onCancel={this.onCancel}
                />
            );
        }
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateInterview }, dispatch);
}

export default connect(null, mapDispatchToProps)(Video);