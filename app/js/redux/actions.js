import expect from 'expect';
import deepFreeze from 'deep-freeze';


export const addToDoList = (name) => {
    return  {
        type: 'ADD_TODO_LIST',
        name
    }
}

export const addToDo = (text) => {
    return  {
        type: 'ADD_TODO',
        text
    }
}

export const toggleToDo = (listId, id) => {
    return {
        type: 'TOGGLE_TODO',
        listId,
        id
    };

}

export const setVisibilityFilter = (filter, listId) => {
    //Filter values: 'all', 'completed', 'uncompleted'
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter,
        listId
    };
}

export const selectList = (listId) => {
    //Filter values: 'all', 'completed', 'uncompleted'
    return {
        type: 'SELECT_LIST',
        listId
    };
}

//This would be a way to do API requests while keeping the action creator as a synchronous function. This avoids the necessity of having to install middleware like redux-thunk, and it's more transparent what is happening. Code like this could easily go in the component did mount, and fetchData could be a React class method.
// const fetchData = (apiUrl, endpoint) => {
//     return axios.get(apiurl + endpoint);
// }

// fetchData('www.something.com', '/endpoint1').then( res => {
//     actionCreator(res)
// })



///************JUNK */

export const onIncrement = () => store.dispatch({type:'increment'});

export const onDecrement = () => store.dispatch({type:'decrement'});

export const addCounter = (counters) => {
    return [...counters, 0];

}

export const removeCounter = (counters, indexToRemove) => {
    const countersCopy =  [...counters];
    countersCopy.splice(indexToRemove, 1);
    return countersCopy;
    // return [
    //     ...counters.slice(0, indexToRemove),
    //     ...counters.slice(indexToRemove+1)
    // ]
}

const incrementCounter = (counters, index) => {
    const countersCopy = [...counters];
    countersCopy[index] += 1;
    return countersCopy;
    // return [
    //     ...counters.slice(0, index),
    //     counters[index] + 1,
    //     ...counters.slice(index + 1)
    // ]
}












//********TESTS

const testToggleToDo = () => {
    const toDoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };
    const toDoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
    };

    deepFreeze(toDoBefore);
    expect(toggleToDo(toDoBefore))
        .toEqual(toDoAfter);
    // console.log(toDoBefore, toggleToDo(toDoBefore))
}

const testIncrementCounter = () => {
    const listBefore = [3, 7, 43];
    const listAfter = [3, 8, 43];
    deepFreeze(listBefore);
    expect(incrementCounter(listBefore, 1))
        .toEqual(listAfter);
    // console.log(listBefore,incrementCounter(listBefore, 1) )
}


const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    deepFreeze(listBefore);
    expect(addCounter(listBefore))
        .toEqual(listAfter);
}

const testRemoveCounter = () => {
    const listBefore = [3, 7, 43];
    const listAfter = [3, 43];
    deepFreeze(listBefore);
    expect(removeCounter(listBefore, 1))
        .toEqual(listAfter);
}

// testAddCounter();
// testRemoveCounter();
// testIncrementCounter();
// testToggleToDo();
// console.log('All tests passed');