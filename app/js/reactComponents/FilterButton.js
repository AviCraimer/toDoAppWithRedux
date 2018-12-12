import React from 'react'

//Redux Actions
import {setVisibilityFilter} from '../redux/actions';


const FilterButton = ({
    filter,
    btnText
}) => {
    return (
        <button
            onClick={e => setVisibilityFilter(filter, [...store.getState().toDos])}
            style={ {backgroundColor: (store.getState().visibilityFilter === filter) ? '#999'  : '#DDD'  } }
        >
        {btnText}
        </button>
    )
}

export default FilterButton;