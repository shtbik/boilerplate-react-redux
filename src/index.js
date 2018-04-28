import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { ConnectedRouter } from 'react-router-redux'
// import { ScrollToTop } from 'components'
import { PersistGate } from 'redux-persist/es/integration/react'

import { store, persistor, history } from 'store'
import { Root } from 'containers'

import 'antd/dist/antd.less'
import 'styles/index.less'

const rootElement = document.getElementById('root')

ReactDOM.render(
	<CookiesProvider>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ConnectedRouter history={history}>
					<Root />
				</ConnectedRouter>
			</PersistGate>
		</Provider>
	</CookiesProvider>,
	rootElement
)
