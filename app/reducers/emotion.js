import _ from 'lodash';

import { PROCESS_VIDEO, CHECK_STATUS, SET_STATUS } from '../actions/emotion';

const initialState = {
    data: null,
    operation: null,
    status: null // status: initial, [fetching, fetched]
};

export default function(state = initialState, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case PROCESS_VIDEO:
            newState.status = 'starting';
            newState.operation = action.payload.headers['operation-location'];
            return newState;
        case CHECK_STATUS:
            if (action.payload.data.status == 'Succeeded') {
                newState.status = 'succeeded';
            }
            else {
                newState.status = 'running';
            }
            newState.data = action.payload.data;
            return newState;
        case SET_STATUS:
            newState.status = action.payload;
            return newState;
        default:
            return state;
    }
}