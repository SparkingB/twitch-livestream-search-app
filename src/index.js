import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TWApp from './components/TWApp';
import { store } from './store/configureStore';
import "style!css!sass!applicationStyles"


ReactDOM.render(
    <Provider store={store}>
        <TWApp />
    </Provider>,
    document.getElementById('root')
);

