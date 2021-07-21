import React from 'react';
import { useDispatch } from 'react-redux';

import { chargeRecipes } from '../../actions/actionsCreator';

import styles from './modal.module.css';

export default function Modal() {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(chargeRecipes());
    };

    return (
        <div className={styles.modal}>
            <h3> Ups! No existen recetas con ese nombre... </h3>
            <button onClick={onClick}> OK </button>
        </div>
    );
};