// import {put , takeEvery , call} from 'redux-saga/effects'
// import { getRequest } from '../../api'
// import { loadingAction, searchDataAction } from '../actions'
// import { SEARCH_SAGA_TYPE } from '../types'

// const requestGet = async () => {
//     const data = await getRequest('news.json' , '' , '')
//     return await data.json()
// }

// function* requestWorker(){
//     yield put(loadingAction())
//     const data = yield call(requestGet)
//     yield put(searchDataAction(data))
//     yield put(loadingAction())
// }

// export function* requestWatcher(){
//     yield takeEvery(SEARCH_SAGA_TYPE , requestWorker)
// }