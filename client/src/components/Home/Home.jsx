import React from 'react';
import Nav from '../Nav/Nav';
// import SearchBar from '../SearchBar/SearchBar';
// import Recipes from '../Recipes/Recipes';

import styles from "./home.module.css";

export default function Home() {
  return (
		<div className={styles.homecont}>
			<Nav />
			{/* <SearchBar /> */}
			{/* <Recipes /> */}
		</div>
	)
};