import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/actionsCreator';

import Nav from '../Nav/Nav';
import Loading from '../Loading/Loading';

import styles from "./recipeDetail.module.css";
import notImage from '../../sources/no-image.jpg';

export default function RecipeDetail({match}) {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.recipeDetail);

  useEffect(()=> {
    const { id } = match.params;
    dispatch(getDetail(id));
  }, []);

  if(!data) {
    return <Loading />
  } else {
      return (
        <>
          <Nav />
          <div className={styles.container}>
            <div className={styles.header}> 
              <div className={styles.info}>
                <h3> Receta: </h3>
                <h3> { data.name } </h3>
                <h3> Puntuación: </h3>
                <span> { data.score } </span>
                <h3> Nivel de comida saludable: </h3>
                <span>   { data.health } </span>
              </div>
              <img src={ data.img || notImage } alt={`Imagen ilustratiba del plato ${ data.name }`} />
            </div>
            <div className={styles.detail}> 
              <h4> Sumario: </h4>
              <p> { data.summary.length > 0 ? data.summary : 'No hay más detalles...' } </p>
              <br />
              <h4> Paso a paso: </h4>
              <p> { data.steps.length > 0 ? data.steps : 'Sin detalles...' } </p>
            </div>
        </div>
      </>
    );
  };
};