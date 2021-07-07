import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { orderByType } from '../../actions/actionsCreator';

import styles from "./orderingByType.module.css";

export default function OrderingByType() {
// ordenamiento por tipo
  const dispatch = useDispatch();
  const recipesLoaded = useSelector(state => state.recipesLoaded);
  const recipesTypes = useSelector(state => state.recipesTypes);
  const handleChange = e => {
    const { value } = e.target;
	dispatch(orderByType(recipesLoaded, value)); 
  };
  return (
		<div className={styles.ordCont}>
			<label htmlFor="order"> Ordenar por dietas: </label>
            <select name="order" id="order" onChange={handleChange}>
				<option value="default"> ---------------------- </option>
				{
					recipesTypes.map((type, i) => {
						<option value={type} key={i}> {type} </option>
					})
				}
			</select>
		</div>
	);
};    