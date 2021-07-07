import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getRecipes } from '../../actions/actionsCreator';

import styles from "./search.module.css";
import { FaSearch } from 'react-icons/fa';

function Search({ getRecipes }) {
	const [input, setInput] = useState('');

	function handleChange(event){
    	setInput(event.target.value);
	};

    function handleSubmit(event){
    	event.preventDefault();
    	if(input) {
     		getRecipes(input);
    	} else {
      		alert("Debes ingresar un ingrediente...");
    	};
		setInput('');
  	};

	return (
			<form className={styles.form}>
			{/* <form onSubmit={handleSubmit}> */}
				<input
					type="text"
					placeholder="Ingrediente..."
					name="ingredient"
					autoComplete="off"
					className={styles.inp}
					value={input}
					onChange={handleChange}
				/>
				{/* <button type="submit" className={styles.btn}> Search </button> */}
				<span className={styles.btn} onClick={handleSubmit}> <FaSearch /> </span>
			</form>
		);
};

function mapStateToProps(state) {
  return {
    	countries: state.countries
	};
};

export default connect(mapStateToProps, { getRecipes })(Search);