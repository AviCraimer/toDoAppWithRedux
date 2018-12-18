import React from 'react'

//Redux Actions
import {setVisibilityFilter} from '../redux/actions';
import { connect } from "react-redux";

const FilterButton = ({
    btnFilter,
    btnText,
    list,
    storeFilter,
    setVisibilityFilter
}) => {
    return (
        <button
            onClick={e => setVisibilityFilter(btnFilter, list.id )}
            style={ {backgroundColor: (storeFilter === btnFilter) ? '#999'  : '#DDD'  } }
        >
            {btnText}
        </button>
    )
}

 //React-redux connect
const mapStateToProps = (storeState) =>  {
    const {lists, activeListId, visibilityFilter} = storeState;

    return {
        list: fn.getById(lists, activeListId),
        storeFilter: visibilityFilter,
        activeListId,
    }
}

  //To use in  MapDispatchToProos
const actionCreators = {
    setVisibilityFilter
};

export default connect(
    mapStateToProps,
    actionCreators
  )(FilterButton);