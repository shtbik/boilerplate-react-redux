export const generateLocationFromName = name => ({
	name,
	host: {
		dev: `${name}.typicode.com`,
		uat: `${name}.typicode.com`,
		prod: `${name}.typicode.com`,
		// dev: `${name}.dev.typicode.comu`,
		// uat: `${name}.uat.typicode.com`,
		// prod: `${name}.typicode.com`,
	},
	port: {
		dev: '',
		uat: '',
		prod: '',
	},
	version: '',
	// version: 'v1',
	protocol: 'https',
})

const locations = [generateLocationFromName('jsonplaceholder')]

export default locations
