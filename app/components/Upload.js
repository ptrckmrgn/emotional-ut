import React, { Component } from 'react';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.setActive = this.setActive.bind(this);
    }

    setActive(active) {
        this.setState({ active });
    }

    render() {
        if (this.props.running) {
            return (
                <div className='upload-wrapper'>
                    <div className="icon">O</div>
                    <div className="progressBar">
                        <div className="progress" style={{width: this.props.progress + '%'}}></div>
                    </div>
                    <div>{this.props.transferred}/{this.props.totalSize} MB ({this.props.progress})</div>
                    <button onClick={this.props.onCancel}>Cancel</button>
                </div>
            );
        }

        return (
            <div className={'upload-wrapper ' + (this.state.active ? 'active' : '')}>
                <input
                    className="input-file"
                    type="file"
                    accept="video/mp4,video/quicktime,video/x-ms-wmv"
                    onDragOver={() => this.setActive(true)}
                    onDragLeave={() => this.setActive(false)}
                    onChange={event => this.props.uploadFile(event.target.files[0])}
                />
                <div className="icon">O</div>
                <div className="message">This is the message</div>
                {this.props.error &&
                    <div className="error upload-error">{this.props.error}</div>
                }
            </div>
        );
    }
}

export default Upload;