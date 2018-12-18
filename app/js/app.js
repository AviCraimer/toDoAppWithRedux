//React
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './reactComponents/Main';
import { Provider } from "react-redux";

//Redux
import {createStore} from 'redux';
import {rootReducer} from './redux/reducers';
import {setVisibilityFilter} from './redux/actions';


import fn from './pureFunctions/fn';
//Add fn as global variable so it only needs to be imported once
window.fn = fn;


//Testing
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const store = createStore(rootReducer);

const printStoreState = () => console.log('Store\'s state: ', store.getState());

// Main React render
const rootRender = function () {
    printStoreState();
    ReactDOM.render(
        <Provider store={store}>
            <Main/>
        </Provider>
        , document.getElementById('Main'));
}


store.subscribe(printStoreState);
rootRender();




