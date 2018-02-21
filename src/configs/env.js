// @flow
import _ from 'lodash'

export function resolveEnvironment(): string {
	const href = _.get(window, 'location.href', '')
	if (~href.indexOf('dev.') || ~href.indexOf('localhost') || ~href.indexOf(':3000')) return 'dev'
	else if (~href.indexOf('uat.')) return 'uat'
	else return 'prod'

	// return ~href.indexOf('.dev') || ~href.indexOf('localhost') || ~href.indexOf(':3000') ? 'dev' : 'prod'
}

export function resolveCookeiDomain(): string {
	const hostname = _.get(window, 'location.hostname', 'test.ru')
	return ~hostname.indexOf('.ru') ? '.' + hostname : ''
}

export function resolvePortalUrl(path: string = '/'): string {
	const env = resolveEnvironment()

	const base = {
		dev: 'https://dev.test.ru',
		uat: 'https://uat.test.ru',
		prod: 'https://test.ru',
	}

	return base[env] + path
}

export function resolveAdminUrl(path: string = '/'): string {
	const env = resolveEnvironment()

	const base = {
		dev: 'https://admin.dev.test.ru',
		uat: 'https://admin.uat.test.ru',
		prod: 'https://admin.test.ru',
	}

	return base[env] + path
}
