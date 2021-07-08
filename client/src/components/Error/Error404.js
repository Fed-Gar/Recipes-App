import React from 'react';
import Nav from '../Nav/Nav';

import img from "../../sources/mono.gif";

import style from "./error404.module.css";

export default function Error404() {
    return (
        <>
            <Nav />
            <div className={style.contError}>
                <h3> Esta página no existe... </h3>
                <img src={img} alt="monito" />
            </div>
        </>
    );
};