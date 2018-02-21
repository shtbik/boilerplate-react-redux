// @flow
import { helpers } from '../helpers'

const { createAction, defaultHandler, obj } = helpers

export const FETCH = 'name-of-your-project/name-of-the-current-file/FETCH'
export const POST = 'name-of-your-project/name-of-the-current-file/POST'
export const PUT = 'name-of-your-project/name-of-the-current-file/PUT'
export const REMOVE = 'name-of-your-project/name-of-the-current-file/DELETE'
export const CLEAR = 'name-of-your-project/name-of-the-current-file/CLEAR'

export const SETIN = 'name-of-your-project/name-of-the-current-file/SETIN'
export const MERGEIN = 'name-of-your-project/name-of-the-current-file/MERGEIN'
export const UNSETIN = 'name-of-your-project/name-of-the-current-file/UNSETIN'
export const RESET = 'name-of-your-project/name-of-the-current-file/RESET'

const fetch = createAction({ type: FETCH, method: 'get' })
const post = createAction({ type: POST, method: 'post' })
const put = createAction({ type: PUT, method: 'put' })
const remove = createAction({ type: REMOVE, method: 'delete' })

export { fetch, post, put, remove }

export const setIn = (path: string, payload: any): Object => ({ type: SETIN, path, payload })
export const unsetIn = (path: string): Object => ({ type: UNSETIN, path })
export const mergeIn = (path: string, payload: Object): Object => ({ type: MERGEIN, path, payload })
export const reset = (): Object => ({ type: RESET })

type actionType = {
	type: string,
	path?: string,
	payload?: any,
	meta?: Object,
}

const initialState = {}

function reducer(state: Object = initialState, action: actionType): Object {
	const { type, payload, path } = action

	switch (type) {
		case FETCH:
		case POST:
		case PUT:
		case REMOVE:
			return defaultHandler(state, action)

		case SETIN:
			return obj.setIn(state, path, payload)

		case MERGEIN:
			return obj.mergeIn(state, path, payload)

		case UNSETIN:
			return obj.unsetIn(state, path)

		case RESET:
			return initialState

		default:
			return state
	}
}

export default reducer
