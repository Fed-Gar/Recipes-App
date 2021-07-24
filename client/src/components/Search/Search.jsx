import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { chargeRecipes, getRecipes } from '../../actions/actionsCreator';

import styles from "./search.module.css";
import { FaSearch } from 'react-icons/fa';

export default function Search() {
	const [state, setState] = useState('');

	const dispatch = useDispatch();

	function handleChange(event) {
    	setState(event.target.value);
	};

	function onClick() {
		dispatch(chargeRecipes());
	};

    function handleSubmit(event) {
		event.preventDefault();
    	if(state.length > 3) {
     		dispatch(getRecipes(state));
    	} else {
      		alert("Debes ingresar un ingrediente...");
    	};
		setState('');
  	};

	return (
		<form className={styles.form}>
			<input
				type="text"
				placeholder="Ingredient..."
				name="ingredient"
				autoComplete="off"
				className={styles.inp}
				value={state}
				onClick={onClick}
				onChange={handleChange}
			/>
			<span className={styles.btn} onClick={handleSubmit}> <FaSearch /> </span>
		</form>
	);
};