import expect from 'expect';
import deepFreeze from 'deep-freeze';

export const addToDo = (text) => {
    const action = {
        type: 'ADD_TODO',
        id: currentToDoId++,
        text
    }
    // console.log(action)

    store.dispatch(action);
}

export const toggleToDo = (toDoId) => {
    store.dispatch({
        type: 'TOGGLE_TODO',
        id: toDoId
    });

    // return Object.assign({}, toDo, {completed: !toDo.completed} )

    // return { ...toDo, completed: !toDo.completed };

    // toDo.completed = !toDo.completed;
    // return toDo;
}

export const setVisibilityFilter = (filter) => {
    //Filter values: 'all', 'completed', 'uncompleted'
    store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
    });
}






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