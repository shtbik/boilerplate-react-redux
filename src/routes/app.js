import React from 'react'

import { ExampleComponent } from 'components'

export default [
	{
		path: '/',
		exact: true,
		component: ExampleComponent,
	},
	{
		path: '/page-2',
		exact: true,
		component: () => <div>Next page</div>,
	},
]
