import { combineReducers } from 'redux';
import Emotion from './emotion';

const rootReducer = combineReducers({
    emotion: Emotion
});

export default rootReducer;