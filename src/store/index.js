import { persistStore } from 'redux-persist/lib'

import configureStore from './configureStore'
import history from './history'

const store = configureStore({})
persistStore(store, { keyPrefix: 'cssm_', whitelist: ['auth'] })

export { store, history }
