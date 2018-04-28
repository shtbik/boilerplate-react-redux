import { persistCombineReducers as combineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { routerReducer as routing } from 'react-router-redux'
import { persist } from 'configs'

import genericReducer, * as generics from './generic'
import apiReducer, * as apis from './api'
import authReducer, * as auths from './auth'

const generic = { default: genericReducer, ...generics }
const api = { default: apiReducer, ...apis }
const auth = { default: authReducer, ...auths }

const persistConfig = persist({ storage })

// import exampleReduxModule from './exampleReduxModule'
const modules = { generic, api, auth }
const rootReducer = combineReducers(persistConfig, {
	routing,
	generic: genericReducer,
	api: apiReducer,
	auth: authReducer,
})

export { modules }
export default rootReducer
