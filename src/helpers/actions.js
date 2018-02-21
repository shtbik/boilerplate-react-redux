// @flow

import _ from 'lodash'
import { handle } from 'redux-pack'

import axios from '../configs/axios'
import { getApiUrl } from '../configs/api'
import { obj } from './reducers'

export function createAction(actionParams: { type: string, method: string }) {
	const { type, method } = actionParams

	return (req: { location: string, params?: Object, path?: string }): Object => {
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
			type,
			promise: axios().request(config),
			meta: {
				initialData,
				path: metaPath || `${serviceName}:${locationPath}.${branch}`,
				onStart: initialPayload => onStart(initialPayload),
				onSuccess: response => onSuccess(response),
				onFailure: error => onFailure(error),
				onFinish: hasSucceeded => onFinish(hasSucceeded),
			},
		}
	}
}

export function defaultHandler(state: Object, action: Object) {
	const { type, payload = {}, meta = {} } = action

	return handle(state, action, {
		start: currentState =>
			obj.mergeIn(currentState, meta.path, {
				loading: true,
				errors: null,
				data: meta.initialData || [],
			}),
		success: currentState => obj.mergeIn(currentState, meta.path, { data: _.get(payload, 'data') }),
		failure: currentState => obj.mergeIn(currentState, meta.path, { errors: payload }),
		finish: currentState => obj.mergeIn(currentState, meta.path, { loading: false }),
	})
}
