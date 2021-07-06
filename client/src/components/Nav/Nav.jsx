import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./nav.module.css";
import imgFood from '../../sources/arroz.jpg';

export default function Nav() {
  return (
    <header className={styles.navBar}>
        <nav>
            <div className={styles.links}>
              <Link to="/">
                <img src={imgFood} alt="Imagen de comida" />
              </Link>
            </div>
            <div className={styles.links}>
              <Link to="/home" > HOME </Link>
              <Link to="/add" > Crear Receta </Link>
            </div>
        </nav>
    </header>
  )
};