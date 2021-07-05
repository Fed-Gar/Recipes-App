import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from "./landing.module.css";
import imgFood from '../../sources/arroz.jpg';

export default function Landing() {
    return(
        <div className={styles.container}>
            <div className={styles.imgCont}>
                <img src={imgFood} alt="Imagen de comida" />
                <div className={styles.text}> 
                    <h1> Bienvenidos! </h1>
                    <NavLink to="/home" > Click para ingresar... </NavLink>
                </div>
            </div>
        </div>
    );
};