import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTypes, filterByType } from '../../actions/actionsCreator';

import styles from "./filterByType.module.css";

export default function FilterByType() {
// ordenamiento por tipo
  const dispatch = useDispatch();

  const recipesTypes = useSelector(state => state.recipesTypes);

  const handleChange = e => {
    const { value } = e.target;
	dispatch(filterByType(value)); 
  };

  useEffect(() => {
	dispatch(getTypes());
  }, []);

  return (
		<div className={styles.ordCont}>
			<label htmlFor="filter"> Ordenar por dietas: </label>
            <select name="filter" id="filter" onChange={handleChange}>
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