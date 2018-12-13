//Put functions that may need to be shared across multiple components here.

//These functions should not use this.props or this.state since it is unknown what the execution context will be. They should not refer to external libraries or global variables (except for fn itself). They should not be used to setState.

//Pass in props or state as arguments to the function. Return values and use React component methods to setState or pass props.

// fn is added as a global variable so it doesn't need to be imported separately into each component.

const fn = {};

//Use in the contructor to bind class functions by name
fn.bindFunctions = function (_this, funcNamesArr) {
    for (let i = 0; i < funcNamesArr.length; i++) {

        const funcName = funcNamesArr[i];
        console.log('function', _this[funcName]);
        _this[funcName] = _this[funcName].bind(_this)
    }
}

fn.getVisibleToDos = function (filter, toDos) {
    switch (filter) {
        case 'completed':
            // console.log('vis filtered todos completed: ',  toDos.filter(toDo => toDo.completed));
            return toDos.filter(toDo => toDo.completed);
        case 'uncompleted':
            return toDos
                .filter(toDo => !toDo.completed);
        default:
            return  [...toDos];
    }
}

fn.sortToDos = function (toDos, sort) {
    switch (sort) {
        case 'stillToDoFirst':
            return [
                ...toDos.filter(toDo => !toDo.completed),
                ...toDos.filter(toDo => toDo.completed)
             ];
        default:
            return toDos;
    }
}

fn.getById = function (arr, id) {
    return arr.filter(x  => x.id === id)[0];
}
fn.getComplementById = function (arr, id) { //Gives a new array with every element of original array except the one with the id
    return arr.filter(x  => x.id !== id);
}

fn.updateListItem = function (arr, newItem) {
    let i;
    for (i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item.id === newItem.id) {
           break;
        }
    }
    return [
        ...arr.slice(0,i),
        newItem,
        ...arr.slice(i + 1)
    ]
}

// console.log('update item by id',   fn.updateItemById(
//     [{id:1, animal: 'frog'},{id:2, animal: 'frog'},{id:8, animal: 'frog'},{id:5, animal: 'frog'}],
//     {id: 8, animal: 'cat' }
//     ));


export default fn;