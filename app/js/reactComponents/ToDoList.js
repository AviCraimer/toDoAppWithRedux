import React from 'react';
import {toggleToDo} from '../redux/actions';

const ToDoList = () => {
    return (
        <ul>
                {store.getState().visibleToDos.map(toDo => {return (
                     <li
                        key={toDo.id}
                        style={{textDecoration:  toDo.completed ? 'line-through': 'none' } }
                        onClick={() => toggleToDo(toDo.id)}
                    >
                        {toDo.text}
                    </li>
                )} )}
        </ul>
    )
}

export default ToDoList;