import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/styles/_fonts.scss';
import './assets/styles/_variables.scss';
import { Provider } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
import { PersistGate } from 'redux-persist/integration/react';

const { persistor, store } = ConfigureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
