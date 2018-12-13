import React from 'react';
import {toggleToDo} from '../redux/actions';

const ToDoList = ({listData}) => {
    return (
        <React.Fragment>
            <h2>{listData.name}</h2>
            <p>Showing: {listData.visibilityFilter}</p>
            <ul className='ToDoList'>
                    {listData.visibleToDos.map(toDo => {return (
                        <li
                            key={toDo.id}
                            style={{textDecoration:  toDo.completed ? 'line-through': 'none' } }
                            onClick={() => toggleToDo(listData.id, toDo.id)}
                        >
                            {toDo.text}
                        </li>
                    )} )}
            </ul>
        </React.Fragment >
    )
}

export default ToDoList;