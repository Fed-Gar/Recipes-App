import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../../actions/actionsCreator';

import styles from "./pagination.module.css";
// import { HiOutlineArrowCircleLeft } from 'react-icons/fa';
// import { HiOutlineArrowCircleRight } from '@react-icons/all-files/fa/FaBeer';

export default function Pagination() {
  const [numPag, setNumPage] = useState(1);

  const dispatch = useDispatch();

  const recipesLoaded = useSelector(state => state.recipesLoaded);

  const group = 10;
  const finalCount = numPag * group;
  const initialCount = finalCount - group;
  const recipes = recipesLoaded.slice(initialCount, finalCount)

  const handlePrev = e => {
	if(numPag > 1) setNumPage(numPag - 1);
  };

  const handleNext = e => {
	if(numPag > 0) setNumPage(numPag + 1);
  };

  useEffect(()=> {
	  dispatch(getRecipes());
  }, []);

  return (
		<div className={styles.pagCont}>
			{/* <button onClick={() => setNumPage(numPag - 1)}> <HiOutlineArrowCircleLeft/> </button> */}
			<p> Páginas </p>
			<div className={styles.pag}>
				<button onClick={ handlePrev }> izq </button>
				<span> { numPag } </span>
				<button onClick={ handleNext }> der </button>
			</div>
		</div>
	);
};