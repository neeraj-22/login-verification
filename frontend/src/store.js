import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

//Importing Reducers
import { profileReducer, userReducer } from './reducers/userReducer'

//Using reducers 
const reducer = combineReducers({
    user: userReducer,
    profile : profileReducer
})

let initialState = {};

//middleware to interact with APIs
const middleware = [thunk];

//creating a store to act as interface between API responses, Reducers and States
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;