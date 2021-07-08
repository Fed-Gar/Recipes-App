import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setPagination } from '../../actions/actionsCreator';

import styles from "./pagination.module.css";
// import { HiOutlineArrowCircleLeft } from 'react-icons/fa';
// import { HiOutlineArrowCircleRight } from '@react-icons/all-files/fa/FaBeer';

export default function Pagination() {
  const [numPag, setNumPage] = useState(1);

  const dispatch = useDispatch();

  const handlePrev = e => {
	if(numPag > 1) setNumPage(numPag - 1);
  };

  const handleNext = e => {
	if(numPag < 17) setNumPage(numPag + 1);
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