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

  if(recipesTypes.length > 0) {
	  return (
		<div className={styles.ordCont}>
			<label htmlFor="filter"> Filtrar por dietas: </label>
            <select name="filter" id="filter" onChange={handleChange}>
				<option value="default"> ---------------------- </option>
				{
					recipesTypes.map(type => {
						return <option value={type.name} key={type.id} > {type.name} </option>
					})
				}
			</select>
		</div>
	  );
	} else {
		return (
			<div className={styles.ordCont}>
				<label htmlFor="filter"> Filtrar por dietas: </label>
            	<select name="filter" id="filter" onChange={handleChange}>
					<option value="default"> ---------------------- </option>
				</select>
		  	</div>
		);
	};
}; 