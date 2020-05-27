import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";

const Detail = ({ toDo, onBtnClick }) => {
    return (
        <>
            <h1>{toDo?.text}</h1>
            <h5>Created at: {toDo?.id}</h5>
            <Link to="/">
                <button onClick={() => onBtnClick(toDo?.id)}>DEL</button>
            </Link>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { 
        match: { 
            params: { id }
        }
    } = ownProps;
    return { toDo: state.find(toDo => toDo.id === parseInt(id))};
}

const mapDispatchToProps = (dispatch) => {
    return {
      onBtnClick: (id) => dispatch(actionCreators.deleteToDo(id))
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(Detail);