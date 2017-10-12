import { combineReducers } from 'redux';
import Interviews from './interviews';
import Emotion from './emotion';

const rootReducer = combineReducers({
    interviews: Interviews,
    emotion: Emotion
});

export default rootReducer;