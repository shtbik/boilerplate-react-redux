// @flow

import _ from 'lodash'
import { Cookies } from 'react-cookie'
import { createAction, defaultHandler } from '../helpers/actions'
import { getApiUrl } from '../configs/api'
import axios from '../configs/axios'
import { AUTH_COOKIE_NAME, AUTH_COOKIE_DOMAIN } from '../configs/auth'
import { obj } from '../helpers/reducers'

const cookies = new Cookies()

// CONSTANTS

export const LOGIN = 'eco-api/auth/LOGIN'
export const LOGOUT = 'eco-api/auth/LOGOUT'
export const UPDATE = 'eco-api/auth/UPDATE'
export const REGISTER = 'eco-api/auth/REGISTER'
export const UNSETIN = 'eco-api/auth/UNSETIN'

// ACTIONS

const register = createAction({ type: REGISTER, method: 'post' })
const update = createAction({ type: UPDATE, method: 'put' })
const clear = (path: string) => ({ type: UNSETIN, path })

const logout = (params: Object = {}) => {
	const { onSuccess = _.noop, onFailure = _.noop, onFinish = _.noop } = params

	return {
		type: LOGOUT,
		promise: Promise.all([
			Promise.resolve(cookies.remove(AUTH_COOKIE_NAME, { domain: AUTH_COOKIE_DOMAIN, path: '/' })),
			localStorage.removeItem(AUTH_COOKIE_NAME),
		]),
		meta: {
			onSuccess: (response: any) => onSuccess(response),
			onFailure: (error: any) => onFailure(error),
			onFinish: (hasSucceeded: boolean) => onFinish(hasSucceeded),
		},
	}
}

const login = (req: { location: string, path?: string, params?: Object }): Object => {
	const method = 'post'
	const { location, params = {}, path: metaPath } = req
	const [serviceName, locationPath, branch = method] = location.split(':')
	const {
		onStart = _.noop,
		onSuccess = _.noop,
		onFailure = _.noop,
		onFinish = _.noop,
		initialData = [],
		...rest
	} = params

	// const config = Object.assign({ url: getApiUrl(location), method }, rest)
	const config = { url: getApiUrl(location), method, ...rest }

	return {
		type: LOGIN,
		promise: axios().request(config),
		meta: {
			initialData,
			path: metaPath || `${serviceName}:${locationPath}.${branch}`,
			onStart: initialPayload => onStart(initialPayload),
			onSuccess: response => {
				const token = _.get(response, 'data.token')
				cookies.set(AUTH_COOKIE_NAME, token, { domain: AUTH_COOKIE_DOMAIN, path: '/' })
				localStorage.setItem(AUTH_COOKIE_NAME, token)
				onSuccess(response)
			},
			onFailure: error => onFailure(error),
			onFinish: hasSucceeded => onFinish(hasSucceeded),
		},
	}
}

export { login, register, update, logout, clear }

// REDUCER

function auth(state: Object = {}, action: { type: string, payload?: any, meta?: Object }): Object {
	const { type } = action

	switch (type) {
		case LOGIN:
		case REGISTER:
			return defaultHandler(state, action)
		// Костыль, нужный до тех пор, пока бэк на начнет отдавать данные пользователя при успешном изменении профиля
		case UPDATE:
			if (action.payload && (action.payload.status === 200 || action.payload.status === 204)) {
				return defaultHandler(state, {
					type: action.type,
					payload: { data: JSON.parse(action.payload.config.data) },
					meta: action.meta,
				})
			}
			return state
		case UNSETIN:
			return obj.unsetIn(state, _.get(action, 'path'))
		case LOGOUT:
			return {}
		default:
			return state
	}
}

export default auth
