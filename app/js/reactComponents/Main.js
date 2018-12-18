import React from 'react';

//React Components
import ToDoList from './ToDoList';
import FilterButton from './FilterButton';
import ToDoLists from './ToDoLists';
//Redux
import {addToDo, addToDoList} from '../redux/actions';
import { connect } from "react-redux";

class Main extends React.Component {

    constructor() {
        super()

        this.state = {

        }
        this.toDoInput = React.createRef();
        this.listInput = React.createRef();

    }


    render() {
        const {addToDo, addToDoList} = this.props;
        return (
        <React.Fragment>
            <h1>To Dos</h1>
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    addToDoList(this.listInput.current.value);
                    this.listInput.current.value = '';
            } }
            >
                <input type="text" ref={this.listInput}/>
                <input type="submit" value="New List"/>
            </form>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                addToDo(this.toDoInput.current.value);
                this.toDoInput.current.value = '';
            }   }>
                <input type="text" ref={this.toDoInput}  />
                <input type="submit" value="Add To DO" />
            </form>

            <ToDoLists />
            <p>
                Show: {' '}
                <FilterButton  btnFilter={'all'} btnText={'Show All'}  />
                <FilterButton  btnFilter={'completed'} btnText={'Show Completed'} />
                <FilterButton  btnFilter={'uncompleted'} btnText={'Show Still To Do'} />
            </p>
        </React.Fragment>
      )
    }
  }

  //React-redux connect

  //To use in  MapDispatchToProos
const actionCreators = {
    addToDo,
    addToDoList
};

export default connect(
    null,
    actionCreators
  )(Main);