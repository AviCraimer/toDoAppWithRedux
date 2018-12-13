//React
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './reactComponents/Main';

//Redux
import {createStore} from 'redux';
import reducers from './redux/reducers';
import {setVisibilityFilter} from './redux/actions';


import fn from './pureFunctions/fn';
//Add fn as global variable so it only needs to be imported once
window.fn = fn;


//Testing
import deepFreeze from 'deep-freeze';
import expect from 'expect';

window.currentToDoListId = 0;
window.store = createStore(reducers.rootReducer);



// React render
const render = function () {
    ReactDOM.render(<Main
    />, document.getElementById('Main'));
}
store.subscribe(render);
render();
// let prevToDos = store.getState().toDos;
// store.subscribe(() => {
//     if (prevToDos !== store.getState().toDos) {
//         setVisibilityFilter(store.getState().visibilityFilter, store.getState().toDos);
//     }
// });



