import _ from 'lodash';

import { PROCESS_VIDEO, CHECK_STATUS } from '../actions/emotion';

const initialState = {
    data: null,
    operation: null,
    isFetching: false // status: initial, [fetching, fetched]
};

export default function(state = initialState, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case PROCESS_VIDEO:
            const location = action.payload.headers['operation-location'];
            newState.isFetching = true;
            newState.operation = location;
            return newState;
        case CHECK_STATUS:
            if (action.payload.data.status == 'Succeeded') {
                newState.isFetching = false;
            }
            newState.data = action.payload.data;
            return newState;
        default:
            return state;
    }
}