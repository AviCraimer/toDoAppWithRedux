import React from 'react';
import {toggleToDo} from '../redux/actions';
import ToDoList from './ToDoList';

const ToDoLists = () => {
    // console.log('Store state inside ToDoLists', store.getState());
    const {lists, activeListId} = store.getState();

    return (
        <ul className={`toDoLists wrapper`}>
            {lists.map(list => {
                return (
                    <li key={'list-' + list.id} id={'list-' +  list.id}  className={`ToDoLists__liContainer ${(activeListId === list.id) ? 'active' : '' }`} >
                        <ToDoList listData={list}  />
                    </li>)
            })}
        </ul>
    )
}

export default ToDoLists;