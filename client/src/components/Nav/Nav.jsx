import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { reset } from '../../actions/actionsCreator';

import styles from "./nav.module.css";
import imgFood from '../../sources/cooking.png';

export default function Nav() {
  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch(reset());
  };

  return (
    <div className={styles.navBar}>
        <nav>
            <div className={styles.links}>
              <Link to="/">
                <img src={imgFood} alt="Imagen de comida" />
              </Link>
            </div>
            <div className={styles.links}>
              <Link to="/home" onClick={handleClick}> HOME </Link>
              <Link to="/create" > Crear Receta </Link>
            </div>
        </nav>
    </div>
  );
};