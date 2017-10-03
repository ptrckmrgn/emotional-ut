import _ from 'lodash';
import React, { Component } from 'react';
import Firebase from 'firebase';
import Mime from 'mime-types';

import Upload from '../components/Upload';

class UploadFile extends Component {
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
                const storageRef = Firebase.storage().ref();
                const filename = _.toString(Date.now()) + '.' + file.name.split('.').pop();
                const fileRef = storageRef.child(filename);
                const uploadTask = fileRef.put(file);
                this.setState({ uploadTask });

                uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        const transferred = _.round(snapshot.bytesTransferred / 1000000);
                        const totalSize = _.round(snapshot.totalBytes / 1000000);
                        const progress = _.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                        this.setState({ transferred, totalSize, progress });

                        switch (snapshot.state) {
                            case Firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
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
                        // Set URL for the video
                        this.props.setURL(uploadTask.snapshot.downloadURL);
                    }
                );
            }
        }
    }

    onCancel() {
        this.state.uploadTask.cancel();
    }

    render() {
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
        )
    }
}

export default UploadFile;