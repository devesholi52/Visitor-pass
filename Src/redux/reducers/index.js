import { combineReducers } from 'redux';
import userSlice from '../Slices/userSlice';


/**
 * Combine all the reducers/Slices here
 */
const rootReducer = combineReducers({
    user: userSlice,
});

export default rootReducer;
