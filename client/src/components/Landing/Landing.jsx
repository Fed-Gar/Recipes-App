import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { chargeRecipes } from '../../actions/actionsCreator';

import styles from "./landing.module.css";
import imgFood from '../../sources/arroz.jpg';

export default function Landing() {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(chargeRecipes());
    }, []);

    return(
        <div className={styles.container}>
            <div className={styles.imgCont}>
                <img src={imgFood} alt="Imagen de comida" />
                <div className={styles.text}> 
                    <h1> Bienvenido! </h1>
                    <NavLink to="/home" > Descubre tus recetas favoritas... </NavLink>
                </div>
            </div>
        </div>
    );
};