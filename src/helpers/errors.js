export function throwNewError(message) {
	if (process && process.env && process.env.NODE_ENV === 'development') throw new Error(message)
}

export function showError(message) {
	if (process && process.env && process.env.NODE_ENV === 'development') console.error(message)
}

export function showWarning(message) {
	if (process && process.env && process.env.NODE_ENV === 'development') console.warn(message)
}
