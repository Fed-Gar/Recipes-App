import React from 'react';
import Search from '../Search/Search';
import Ordering from '../Ordering/Ordering';
import Pagination from '../Pagination/Pagination';

import styles from "./home.module.css";

export default function Home() {
  return (
		<div className={styles.homecont}>
            <Search />
            <Ordering />
            <Pagination />
		</div>
	);
};