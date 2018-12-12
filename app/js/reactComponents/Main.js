import React from 'react';

//React Components
import ToDoList from './ToDoList';
import FilterButton from './FilterButton';

//Redux
import {addToDo, toggleToDo, setVisibilityFilter} from '../redux/actions';

class Main extends React.Component {

    constructor() {
        super()

        this.state = {

        }
        this.input = React.createRef();

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
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                addToDo(this.input.current.value);
                this.input.current.value = '';
            }   }>
                <input type="text" ref={this.input}  />
                <input type="submit" value="Add To DO" />
            </form>
            {/* <button onClick={() => {
                console.log(this.input.current.value)
                addToDo(this.input.current.value)
                console.log(store.getState());
            }  }>Add To Do</button> */}
            <ToDoList />
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


