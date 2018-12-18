import React from 'react';
import { connect } from "react-redux";
import {toggleToDo, selectList} from '../redux/actions';
import ToDoList from './ToDoList';

const ToDoLists = ({lists, activeListId, toggleToDo, selectList}) => {

    return (
        <ul className={`toDoLists wrapper`}>
            {lists.map(list => {
                const isActive = activeListId === list.id;
                return (
                    <li
                        key={'list-' + list.id} id={'list-' +  list.id}
                        className={`ToDoLists__liContainer ${ isActive ? 'active' : '' }`}
                        onClick={() => {if (!isActive) {selectList(list.id) } } }
                    >
                        <ToDoList listData={list} toggleToDo={toggleToDo}  />
                    </li>)
            })}
        </ul>
    )
}

//React-redux connect
const mapStateToProps = (storeState) =>  {
    const {lists, activeListId} = storeState;

    return {
        lists, activeListId
    }
}

  //To use in MapDispatchToProps
const actionCreators = {
    toggleToDo,
    selectList
};

export default connect(
    mapStateToProps,
    actionCreators
  )(ToDoLists);



// export default ToDoLists;