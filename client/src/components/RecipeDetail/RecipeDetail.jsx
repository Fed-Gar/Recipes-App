import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/actionsCreator';

import Nav from '../Nav/Nav';

import styles from "./recipeDetail.module.css";

export default function RecipeDetail({match}) {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.recipeDetail);

  console.log(data)

  useEffect(()=> {
    const { id } = match.params;
    dispatch(getDetail(id));
  }, []);

  if(!data) {
    return <h3> Cargando... </h3>
  } else {
      return (
        <>
          <Nav />
          <div className={styles.container}>
            <div className={styles.header}> 
              <div className={styles.info}>
                <h3> { data.name } </h3>
                <span> { data.score } </span>
                <span>   { data.health } </span>
              </div>
              <div className={styles.img}> 
                <img src={ data.img } alt={`Imagen ilustratiba del plato ${ data.name }`} />
              </div>
            </div>
            <div className={styles.detail}> 
              <p> { data.summary } </p>
              <p> { data.steps } </p>
            </div>
        </div>
      </>
    );
  };
};

// 716426
// 715594
// 1