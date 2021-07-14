import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByName, orderByScore, chargeRecipes } from '../../actions/actionsCreator';

import styles from "./ordering.module.css";

export default function Ordering() {
  const dispatch = useDispatch();

  const recipesLoaded = useSelector(state => state.recipesLoaded);

  const handleChange = e => {
    const { value } = e.target;
	if(value === 'default') dispatch(chargeRecipes());
	if(value === 'aZ' || value === 'zA') dispatch(orderByName(recipesLoaded, value)); 
	if(value === 'menor' || value === 'mayor') dispatch(orderByScore(recipesLoaded, value)); 
  }; 
  
  return (
		<div className={styles.ordCont}>
			<label htmlFor="order"> Ordenar por: </label>
            <select 
				name="order" 
				id="order" 
				onChange={handleChange}>
					<option value="default"> Default </option>
					<optgroup label="Nombre">
						<option value="aZ"> A - Z </option>
						<option value="zA"> Z - A </option>
					</optgroup>
					<optgroup label="Puntuación">
						<option value="menor"> Menor a mayor </option>
						<option value="mayor"> Mayor a menor </option>
					</optgroup>
			</select>
		</div>
	);
};