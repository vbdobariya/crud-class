import userSubmitReducer from '../redux/UserReducer'
import {createStore} from 'redux'

const store=createStore(userSubmitReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;