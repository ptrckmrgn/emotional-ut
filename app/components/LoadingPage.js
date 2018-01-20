import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingPage = () => {
    return (
        <div>
            <PulseLoader loading={true} />
        </div>
    );
}

export default LoadingPage;
