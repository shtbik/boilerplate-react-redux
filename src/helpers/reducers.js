import _ from 'lodash'

// immutable object manipulation with lodash
export const obj = {
	// recursevely merge with an object on path
	mergeIn(currentState, path, payload) {
		const nextState = _.cloneDeep(currentState)
		const currentMergeBranch = _.get(nextState, path, {})
		const nextMergeBranch = _.mergeWith(currentMergeBranch, payload, (objValue, srcValue) => {
			if (_.isArray(objValue)) {
				return srcValue
			}
		})
		return _.set(nextState, path, nextMergeBranch)
	},

	// overwrite contents of an object on path
	setIn(currentState, path, payload) {
		const nextState = _.cloneDeep(currentState)
		return _.set(nextState, path, payload)
	},

	// remove element at path
	unsetIn(currentState, path) {
		const nextState = _.cloneDeep(currentState)
		_.unset(nextState, path)
		return nextState
	},
}

export const arr = {
	shift: _.noop,
	pop: _.noop,
	slice: _.noop,
	splice: _.noop,
}
