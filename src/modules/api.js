// @flow

// import _ from 'lodash'
import { createAction, defaultHandler } from '../helpers/actions'
import { obj } from '../helpers/reducers'

export const FETCH = 'eco-api/api/FETCH'
export const PATCH = 'eco-api/api/PATCH'
export const POST = 'eco-api/api/POST'
export const PUT = 'eco-api/api/PUT'
export const REMOVE = 'eco-api/api/DELETE'
export const UNSETIN = 'eco-api/api/UNSETIN'

const fetch = createAction({ type: FETCH, method: 'get' })
const patch = createAction({ type: PATCH, method: 'patch' })
const post = createAction({ type: POST, method: 'post' })
const put = createAction({ type: PUT, method: 'put' })
const remove = createAction({ type: REMOVE, method: 'delete' })
const clear = (path: string) => ({ type: UNSETIN, path })

export { fetch, patch, post, put, remove, clear }

function reqres(
	state: Object = {},
	action: { type: string, path?: string, payload?: any, meta?: Object }
): Object {
	const { type } = action

	switch (type) {
		case FETCH:
		case PATCH:
		case POST:
		case PUT:
		case REMOVE:
			return defaultHandler(state, action)

		case UNSETIN:
			// return obj.unsetIn(state, _.get(action, 'path'))
			return obj.unsetIn(state, action.path)

		default:
			return state
	}
}

export default reqres
