import React from 'react'

//Redux Actions
import {setVisibilityFilter} from '../redux/actions';


const FilterButton = ({
    filter,
    btnText
}) => {
    const list  =  fn.getById(store.getState().lists, store.getState().activeListId);
    return (
        <button
            onClick={e => setVisibilityFilter(filter, list.id )}
            style={ {backgroundColor: (store.getState().visibilityFilter === filter) ? '#999'  : '#DDD'  } }
        >
        {btnText}
        </button>
    )
}

export default FilterButton;