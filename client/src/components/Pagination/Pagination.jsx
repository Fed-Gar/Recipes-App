import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPagination } from '../../actions/actionsCreator';

import styles from "./pagination.module.css";
import { BiArrowToLeft } from "react-icons/bi";
import { BiArrowToRight } from "react-icons/bi";

export default function Pagination() {
  const [numPag, setNumPage] = useState(1);

  const dispatch = useDispatch();

  const recipes = useSelector(state => state.recipesLoaded);
  
  const max = Math.ceil(recipes.length / 3);

  const handlePrev = e => {
	if(numPag > 1) setNumPage(numPag - 1);
  };

  const handleNext = e => {
	if(numPag < max) setNumPage(numPag + 1);
  };

  // useEffect(()=> {
	//   dispatch(setPagination(numPag));
  // }, [numPag]);

  const set = useCallback(() => {
    dispatch(setPagination(numPag));
  }, [numPag, dispatch]);

  useEffect(() => {
    set();
  }, [set]);

  return (
    <div className={styles.pagCont}>
			<p> Pages </p>
			<div className={styles.pag}>
			  <BiArrowToLeft className={styles.arrow} onClick={ handlePrev } />
				<span> { numPag } </span>
			  <BiArrowToRight className={styles.arrow} onClick={ handleNext } />
			</div>
		</div>
  );
};