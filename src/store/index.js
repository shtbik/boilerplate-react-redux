import { persistStore } from 'redux-persist'

import configureStore from './configureStore'
import history from './history'

const store = configureStore({})
const persistor = persistStore(store)

export { store, history, persistor }
