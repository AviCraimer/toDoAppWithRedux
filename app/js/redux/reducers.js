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

reducers.loadSave = (state, action) => {
    //Note this reducer works but it is breaking the "rules" because it has side effects and isn't a pure function. I could make it pure, but passing, localStorage.toDos in as a third argument, but then it couldn't be the root reducer. I could also try making the load happen in an action creator.
    if (state === undefined && localStorage.toDos) {
        return JSON.parse(localStorage.toDos);
    } else {
        const newState = reducers.toDoLists(state, action)
        localStorage.toDos = JSON.stringify(newState);
        return newState;
    }
}

reducers.toDoLists = (
    state = {
        currentListId: 0,
        activeListId: 0,
        lists: [reducers.toDoLists.toDoList(undefined, {
            type: 'ADD_TODO_LIST',
            name: 'To Dos - List 1'
        }, 0)]
        }, action) => {
    const r = reducers.toDoLists;
    switch (action.type) {
        case 'ADD_TODO_LIST': {
            let newListId = state.currentListId + 1;
            const newLists = [...state.lists, r.toDoList(undefined, action, newListId)];
            return {...state, currentListId: newListId, lists: newLists }
        }
        case 'TOGGLE_TODO': {
            const list = fn.getById(state.lists, action.listId);
            const toggledList = r.toDoList(list, action);
            return {
                ...state,
                lists: fn.updateListItem(state.lists, toggledList)
             };
        }
        case 'ADD_TODO': {
            const list = fn.getById(state.lists, state.activeListId);
            const toDoAddedList = r.toDoList(list, action);
            return {
                ...state,
                lists: fn.updateListItem(state.lists, toDoAddedList)
            }
        }
        case 'SET_VISIBILITY_FILTER': {
            const list = fn.getById(state.lists, action.listId);
            return {
                ...state,
                lists:  fn.updateListItem(state.lists, r.toDoList(list, action))
            }
        }
        case 'SELECT_LIST': {
            return {
                ...state,
                activeListId: action.listId
            }
        }
        default: {
            return state;
        }
    }//end switch

}

reducers.toDoLists.toDoList = (state = {}, action, newListId) => {
    const r = reducers.toDoLists;
    // let window.newState = {};
    switch (action.type) {
        case 'ADD_TODO': {
            const newToDoId = state.currentToDoId + 1;
            const newToDos = [...state.toDos, reducers.toDoLists.toDo(undefined, action, newToDoId) ];
            state = {...state, currentToDoId: newToDoId, toDos: newToDos};
            break;
        }
        case 'TOGGLE_TODO': {
            const newToDos = state.toDos.map(toDo => {
                if (toDo.id === action.id) {
                    return {...toDo, completed: !toDo.completed};
                } else {
                    return toDo;
                }
            });
            state = {...state, toDos: newToDos};
            break;
        }
        case 'SET_VISIBILITY_FILTER': {
            state = {
                ...state,
                visibilityFilter: action.filter
            }
            break;
        }
        default: {
            state = {...state,
                id: newListId,
                name: action.name,
                currentToDoId: -1,
                toDos: [],
                visibilityFilter: 'all'
            }
            break;
        }
    }// End of switch

    // return state;
    return {...state,  visibleToDos: r.visibleToDos(state.visibleToDos, action, state.visibilityFilter, state.toDos)}

}



reducers.toDoLists.toDo = (state, action, id) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id,
                text: action.text,
                completed: false
            };
        default:
            return state;
    }
}




reducers.toDoLists.visibleToDos = (state = [], action, filter, toDos) => {

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

export const rootReducer = reducers.loadSave;
// reducers.rootReducer = (state = {}, action) => {


    // const r = reducers;

    // state = {
    //     toDos: r.toDos(state.toDos, action),
    //     visibilityFilter: r.visibilityFilter( state.visibilityFilter , action),
    // }

    // state.visibleToDos = r.visibleToDos(state.visibleToDos, action, state.visibilityFilter, state.toDos);

    // return state;
// }


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