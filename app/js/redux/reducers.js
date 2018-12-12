import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';

// const counter = (state = 0, action) => {
//     switch (action.type) {
//         case 'increment':
//             return state + 1;
//         case 'decrement':
//             return state - 1;
//         default: return state;
//     }
// }
const reducers = {};


reducers.makeToDo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        default:
            return state;
    }
}

reducers.toDos = (state = [], action ) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, reducers.makeToDo(undefined, action) ];
        case 'TOGGLE_TODO':
            return state.map(toDo => {
                if (toDo.id === action.id) {
                    return {...toDo, completed: !toDo.completed};
                } else {
                    return toDo;
                }
            });
        default:
            return state;
    }
}

reducers.visibilityFilter = (state = 'all', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            console.log('vis filter reducer called');
            return action.filter;
        default:
            return state;
    }
}

reducers.visibleToDos = (state = [], action, filter, toDos) => {

    if ( ['SET_VISIBILITY_FILTER','TOGGLE_TODO','ADD_TODO'].includes(action.type) ) {

            let visibleToDos = fn.getVisibleToDos(filter, toDos);
            if (filter = 'all') {
                visibleToDos =  fn.sortToDos(visibleToDos, 'stillToDoFirst');
            }
            return visibleToDos;
    } else {
            return state;
    }
}


//Combine reducers

reducers.rootReducer = (state = {}, action) => {
    const r = reducers;

    state = {
        toDos: r.toDos(state.toDos, action),
        visibilityFilter: r.visibilityFilter( state.visibilityFilter , action),
    }

    state.visibleToDos = r.visibleToDos(state.visibleToDos, action, state.visibilityFilter, state.toDos);

    return state;
}


// const toDoApp = reduceReducers (
//     combineReducers({
//     toDos, visibilityFilter
//     }),
//     visibleToDos
// ) ;




///****JUNK */

// const testToggleToDos = () => {
//     const stateBefore = [
//         {
//             id: 0,
//             text: 'Learn Redux',
//             completed: false
//         },
//         {
//             id: 1,
//             text: 'go shopping',
//             completed: false
//         }
//     ];
//     const action = {
//         type: 'TOGGLE_TODO',
//         id: 0
//     }
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'Learn Redux',
//             completed: true
//         },
//         {
//             id: 1,
//             text: 'go shopping',
//             completed: false
//         }
//     ];
//     deepFreeze(stateBefore);
//     deepFreeze(action);
//     expect(toDos(stateBefore, action))
//         .toEqual(stateAfter);
//         console.log(toDos(stateBefore, action))
// }


// const testToDos = () => {
//     const stateBefore = [];
//     const action = {
//         type: 'ADD_TODO',
//         payload: {
//             id: 0,
//             text: 'Learn Redux',
//             completed: false
//         }
//     };

//     deepFreeze(stateBefore);
//     deepFreeze(action);
//     const stateAfter = [{
//         id: 0,
//         text: 'Learn Redux',
//         completed: false
//     }];
//     expect(toDos(stateBefore, action))
//         .toEqual(stateAfter);
//         console.log(toDos(stateBefore, action))
// }

// testToDos();
// testToggleToDos();
// console.log('All Tests Passed')
export default reducers;