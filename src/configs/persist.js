const defaultPersistConfig = {
	key: 'storage',
	keyPrefix: 'eco',
	whitelist: ['auth'],
}

export default function persistConfig(params) {
	return Object.assign(defaultPersistConfig, params)
}
