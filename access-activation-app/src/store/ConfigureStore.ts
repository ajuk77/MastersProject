import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import * as LocalForage from 'localforage';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: LocalForage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default() => {
    let store = createStore(
        persistedReducer,
        applyMiddleware(
            thunk
        )
    )
    let persistor = persistStore(store)
    return { store, persistor }
}