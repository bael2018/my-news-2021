import { createStore , combineReducers } from "redux";
import { loadingReducer } from './loadingReducer'

const rootReducer = combineReducers({
    load: loadingReducer,
})

export const store = createStore(rootReducer)