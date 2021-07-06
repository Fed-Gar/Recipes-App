import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getRecipes } from '../../actions/index';

import styles from "./search.module.css";

function Search({ getRecipes }) {
	const [input, setInput] = useState({
		ingredient: "",
	});

	function handleChange(event){
    	setInput({
    		ingredient: event.target.value,
    	});
	};

    function handleSubmit(event){
    	event.preventDefault();
    	if(input.ingredient) {
     		getRecipes(input.ingredient);
    	} else {
      		alert("Debes ingresar un ingrediente...");
    	};
		setInput({
			ingredient: '',
		});
  	};

	return (
			<div className="cont">
				<form onSubmit={handleSubmit}>
					<input
						className="input"
						type="text"
						placeholder="Search Country..."
						name="ingredient"
						autoComplete="off"
						value={input.ingredient}
						onChange={handleChange}
					/>
					<button type="submit" className="btns"> Search </button>
				</form>
			</div>
		);
};

function mapStateToProps(state) {
  return {
    	countries: state.countries
	};
};

export default connect(mapStateToProps, { getRecipes })(Search);