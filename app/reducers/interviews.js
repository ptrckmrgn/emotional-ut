import {
    FETCH_INTERVIEWS,
    FETCH_INTERVIEW,
    CREATE_INTERVIEW,
    RESET_CREATE_INTERVIEW,
    DELETE_INTERVIEW
} from '../actions/interviews';

const initialState = {
    list: null,
    createInterview: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_INTERVIEWS:
            // return action.interviews;
            // const interviews = action.interviews;
            return Object.assign({}, state, {
                list: action.interviews
            });
        case CREATE_INTERVIEW:
            return Object.assign({}, state, {
                createInterview: action.interview
            });
        case RESET_CREATE_INTERVIEW:
            return Object.assign({}, state, {
                createInterview: null
            });
        default:
            return state;
    }
}