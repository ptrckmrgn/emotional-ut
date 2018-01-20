import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Processing = props => {
    if (props.progress) {
        return (
            <div className='wrapper'>
                <PropagateLoader loading={true} />
                <div className="progressBar">
                    <div className="progress" style={{width: props.progress + '%'}}></div>
                </div>
                <div>{props.progress}%</div>
            </div>
        );
    }
    return null;
}

export default Processing;
