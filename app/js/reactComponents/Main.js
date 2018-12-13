import React from 'react';

//React Components
import ToDoList from './ToDoList';
import FilterButton from './FilterButton';
import ToDoLists from './ToDoLists';
//Redux
import {addToDo, toggleToDo, setVisibilityFilter, addToDoList} from '../redux/actions';

class Main extends React.Component {

    constructor() {
        super()

        this.state = {

        }
        this.toDoInput = React.createRef();
        this.listInput = React.createRef();

    }


    componentDidMount() {

    }//End of componentDidMount

    // getVisibleToDos (filter, toDos)  {
    //     switch (filter) {
    //         // case 'all':
    //         //     return toDos;
    //         case 'completed':
    //             return toDos
    //                 .filter(toDo => toDo.completed === true);
    //         case 'uncompleted':
    //             return toDos
    //                 .filter(toDo => toDo.completed === false);
    //         default:
    //             return toDos
    //     }
    // }


    render() {
        console.log('Store\'s state: ', store.getState())

        // setVisibilityFilter(store.getState().setVisibilityFilter,  store.getState().toDos);

        return (
        <React.Fragment>
            <h1>To Dos</h1>
            <form
                action=""
                onSubmit={(e) => {
                e.preventDefault();
                addToDoList(this.listInput.current.value);
                this.listInput.current.value = '';

            }   }>
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
                <FilterButton  filter={'all'} btnText={'Show All'}  />
                <FilterButton  filter={'completed'} btnText={'Show Completed'} />
                <FilterButton  filter={'uncompleted'} btnText={'Show Still To Do'} />
            </p>
        </React.Fragment>
      )
    }
  }

export default Main;


