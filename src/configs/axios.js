// @flow
import axios from 'axios'

import { getAuthToken } from '../helpers/auth'

export const CancelToken = axios.CancelToken

export default function(params?: Object) {
	const token = getAuthToken()

	const config = Object.assign(
		{
			timeout: 60000 * 30,
			headers: {
				Authorization: 'Bearer ' + token,
				Source: 'ui',
			},
		},
		params
	)

	return axios.create(config)
}
