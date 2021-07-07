import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByTypes } from '../../actions/actionsCreator';

import styles from "./orderingByType.module.css";

export default function OrderingByType() {
// ordenamiento orden alfabetico y puntuacion
  const dispatch = useDispatch();
  const recipesLoaded = useSelector(state => state.recipesLoaded);
  return (
		<div className={styles.ordCont}>
			<label for="order"> Ordenar de: </label>
            <select name="name" id="order">
				<option value="default"> ---------------------- </option>
				<option value="aZ"> A - Z </option>
				<option value="zA"> Z - A </option>
			</select>
		</div>
	);
};