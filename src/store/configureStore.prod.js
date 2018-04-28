import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import { routerMiddleware } from 'react-router-redux'

import history from './history'
import rootReducer from '../modules'

const historyMiddleware = routerMiddleware(history)

const middleware = compose(applyMiddleware(thunkMiddleware, reduxPackMiddleware, historyMiddleware))

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, middleware)
}
