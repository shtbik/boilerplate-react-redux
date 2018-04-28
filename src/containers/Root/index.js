import React from 'react'
import { Route } from 'react-router-dom'
import { LocaleProvider } from 'antd'

import { App } from 'containers'

const Root = () => (
	<LocaleProvider>
		<Route path="/" component={App} />
	</LocaleProvider>
)

export default Root
