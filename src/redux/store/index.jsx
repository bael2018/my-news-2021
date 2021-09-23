import { createStore , combineReducers } from "redux";
import { sidebarReducer } from './sidebarReducer'
import { loadingReducer } from './loadingReducer'
// import createSagaMiddleware from 'redux-saga';
// import { requestWatcher } from "../saga";
// const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    load: loadingReducer,
})

export const store = createStore(rootReducer)
// sagaMiddleware.run(requestWatcher)