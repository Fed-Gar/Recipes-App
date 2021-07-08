import React, { useState } from 'react';
import { useSelector,  } from 'react-redux';

import styles from "./pagination.module.css";
// import { HiOutlineArrowCircleLeft } from 'react-icons/fa';
// import { HiOutlineArrowCircleRight } from '@react-icons/all-files/fa/FaBeer';

export default function Pagination() {
  const [numPag, setNumPage] = useState(1);

  const pag = useSelector(state => state.numPag);
  // tengo que hacer que mi stado numPag sea igual al num de paginas

  const handlePrev = e => {
	if(numPag > 1) setNumPage(numPag - 1);
  };

  const handleNext = e => {
	if(numPag < 17) setNumPage(numPag + 1);
  };

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