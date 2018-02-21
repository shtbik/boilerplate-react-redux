import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import genericReducer, * as generics from './generic'
import apiReducer, * as apis from './api'
import authReducer, * as auths from './auth'

const generic = { default: genericReducer, ...generics }
const api = { default: apiReducer, ...apis }
const auth = { default: authReducer, ...auths }

// import exampleReduxModule from './exampleReduxModule'
const modules = { generic, api, auth }
const rootReducer = combineReducers({
	routing,
	generic: genericReducer,
	api: apiReducer,
	auth: authReducer,
})

export { modules }
export default rootReducer
