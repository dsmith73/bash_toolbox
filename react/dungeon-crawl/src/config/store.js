import { createStore, combineReducers } from 'redux'
import playerReducer from '../features/player/reducer'
import mapReducer from '../features/map/reducer'

// js object that stores keys 
const rootReducer = combineReducers({
    player: playerReducer,
    map: mapReducer,
})


const store = createStore (
    // github.com/zalmoxisus/redux-devtools-extension  
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)




export default store