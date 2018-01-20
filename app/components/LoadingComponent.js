import React from 'react';
import { SyncLoader } from 'react-spinners';

const PageLoading = () => {
    return (
        <div>
            <SyncLoader loading={true} />
        </div>
    );
}

export default PageLoading;