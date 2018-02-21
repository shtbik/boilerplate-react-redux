import { Cookies } from 'react-cookie'

import { AUTH_COOKIE_NAME } from '../configs/auth'

export function getAuthToken() {
	const cookies = new Cookies()
	// return localStorage.getItem(AUTH_COOKIE_NAME)
	return localStorage.getItem(AUTH_COOKIE_NAME) || cookies.get(AUTH_COOKIE_NAME)
}

export function tokenIsValid(token) {
	return true
}

export function isAuthenticated() {
	const token = getAuthToken()
	return !!(token && tokenIsValid(token))
}
