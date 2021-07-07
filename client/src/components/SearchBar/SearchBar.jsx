import React from 'react';
import Search from '../Search/Search';
import Ordering from '../Ordering/Ordering';
import OrderingByType from '../OrderingByType/OrderingByType';
import Pagination from '../Pagination/Pagination';

import styles from "./searchBar.module.css";

export default function SearchBar() {
  return (
	    <div className={styles.barCont}>
        <Search />
        <Ordering />
        <OrderingByType />
        <Pagination />
	    </div>
  );
};