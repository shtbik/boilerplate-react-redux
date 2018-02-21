// @flow

import _ from 'lodash'

import apiLocations, { generateLocationFromName } from './apiLocations'
import { resolveEnvironment } from './env'
import { showWarning } from '../helpers/errors'

const generateLocationAndWarn = serviceName => {
	showWarning(`Service '${serviceName}' does not exist. Service URL was generated automatically.`)
	return generateLocationFromName(serviceName)
}

/**
*	Obtain correct API URL for a micro service.
*	@var location string fromat: serviceName:path
*
* example getApiUrl('school-courses:tags')
*/
export function getApiUrl(location: string): string {
	const env = resolveEnvironment()

	const [serviceName, path] = location.split(':')

	// external requests for all requests outside of the ecosystem
	if (serviceName === 'external') return path

	const apiLocation =
		_.find(apiLocations, { name: serviceName }) || generateLocationAndWarn(serviceName)

	// if (!apiLocation) throwNewError(`Service '${serviceName}' does not exist. [modules/api/getApiUrl]`)

	const { protocol = 'https', host, port, version } = apiLocation
	const urlSegments = [
		protocol,
		'://',
		host[env],
		port[env] ? ':' + port[env] : '',
		version ? '/' + version : '',
		'/',
		path,
	]

	return urlSegments.join('')
}
