// @flow

import { obj } from '../helpers/reducers'

// CONSTANTS

export const SETIN = 'eco-api/generic/SETIN'
export const MERGEIN = 'eco-api/generic/MERGEIN'
export const UNSETIN = 'eco-api/generic/UNSETIN'
export const RESET = 'eco-api/generic/RESET'

// ACTIONS

/**
 * Set/replace data in a given path.
 *
 * @example
 *
 * dispatch( setIn('greeting', 'Hello there!') )
 * dispatch( setIn('ids', [1, 2, 3]) )
 * dispatch( setIn('foo', {bar: 'baz'}) )
 *
 */
export const setIn = (path: string, payload: any): Object => ({ type: SETIN, path, payload })

/**
 * Recursevely merge with an object on path.
 *
 * @example
 *
 * dispatch( mergeIn('path', {foo: {bar: 'baz'} }) )
 *
 */
export const mergeIn = (path: string, payload: Object): Object => ({ type: MERGEIN, path, payload })

/**
 * Remove an element on path.
 *
 * @example
 *
 * dispatch( unsetIn('path') )
 *
 */
export const unsetIn = (path: string): Object => ({ type: UNSETIN, path })

/**
 * Reset state of the whole reducer to initialState.
 *
 * @example
 *
 * dispatch( reset() )
 *
 */
export const reset = (): Object => ({ type: RESET })

// REDUCER

const initialState = {}
const generic = (currentState: Object = initialState, action: Object): Object => {
	const { type, path, payload } = action

	switch (type) {
		case SETIN:
			return obj.setIn(currentState, path, payload)

		case MERGEIN:
			return obj.mergeIn(currentState, path, payload)

		case UNSETIN:
			return obj.unsetIn(currentState, path)

		case RESET:
			return initialState

		default:
			return currentState
	}
}

export default generic
