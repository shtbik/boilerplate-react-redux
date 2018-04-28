import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import { routerMiddleware } from 'react-router-redux'

import history from './history'
import rootReducer from 'modules/index'

const loggerMiddleware = createLogger({
	level: 'info',
	collapsed: true,
})
const userLogger = true

const historyMiddleware = routerMiddleware(history)

const middleware = compose(
	userLogger
		? applyMiddleware(thunkMiddleware, reduxPackMiddleware, historyMiddleware, loggerMiddleware)
		: applyMiddleware(thunkMiddleware, reduxPackMiddleware, historyMiddleware)
)

const configureStore = function(initialState) {
	const store = createStore(rootReducer, initialState, middleware)

	return store
}

export default configureStore
