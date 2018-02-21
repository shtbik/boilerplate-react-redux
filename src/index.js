import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { ConnectedRouter } from 'react-router-redux'
import { LocaleProvider } from 'antd'

import 'antd/dist/antd.less'
import 'styles/index.less'

import { store, history } from 'store'
import Root from 'containers'

const rootElement = document.getElementById('root')

if (process.env.NODE_ENV === 'development') {
	ReactDOM.render(
		<CookiesProvider>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<AppContainer>
						<LocaleProvider>
							<Root />
						</LocaleProvider>
					</AppContainer>
				</ConnectedRouter>
			</Provider>
		</CookiesProvider>,
		rootElement
	)
} else {
	ReactDOM.render(
		<CookiesProvider>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<LocaleProvider>
						<Root />
					</LocaleProvider>
				</ConnectedRouter>
			</Provider>
		</CookiesProvider>,
		rootElement
	)
}

if (module.hot) {
	module.hot.accept('./containers', () => {
		render(require('./containers').default)
	})
}
