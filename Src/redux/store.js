import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// import logger from 'redux-logger';

//const middleWares = [thunk,logger];

const store = configureStore({
    reducer: rootReducer,
    // middleware: __DEV__ ? [thunk, logger] : [thunk],
    middleware: [thunk],
});

export default store;
