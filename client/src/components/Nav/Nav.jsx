import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./nav.module.css";
import imgFood from '../../sources/cooking.png';

export default function Nav() {
  return (
    <div className={styles.navBar}>
        <nav>
            <div className={styles.links}>
              <Link to="/">
                <img src={imgFood} alt="Imagen de comida" />
              </Link>
            </div>
            <div className={styles.links}>
              <Link to="/home"> HOME </Link>
              <Link to="/create" > Create Recipe </Link>
            </div>
        </nav>
    </div>
  );
};