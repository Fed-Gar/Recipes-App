import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPagination } from '../../actions/actionsCreator';

import styles from "./pagination.module.css";
// import { HiOutlineArrowCircleLeft } from 'react-icons/fa';
// import { HiOutlineArrowCircleRight } from '@react-icons/all-files/fa/FaBeer';

export default function Pagination() {
  const [numPag, setNumPage] = useState(1);

  const dispatch = useDispatch();

  const recipes = useSelector(state => state.recipesLoaded);
  const search = useSelector(state => state.recipesSearch);
  let max;

  if(search.length > 0) max = Math.ceil(search.length / 6);
  else {
    max = Math.ceil(recipes.length / 6);
  };

  const handlePrev = e => {
	if(numPag > 1) setNumPage(numPag - 1);
  };

  const handleNext = e => {
	if(numPag < max) setNumPage(numPag + 1);
  };

  useEffect(()=> {
	  dispatch(setPagination(numPag));
  }, [numPag]);

  return (
    <div className={styles.pagCont}>
			<p> Páginas </p>
			<div className={styles.pag}>
			  {/* <button onClick={ handlePrev }> <HiOutlineArrowCircleLeft/> </button> */}
			  <button onClick={ handlePrev }> izq </button>
				<span> { numPag } </span>
			  {/* <button onClick={ handlePrev }> <HiOutlineArrowCircleRight/> </button> */}
				<button onClick={ handleNext }> der </button>
			</div>
		</div>
  );
};