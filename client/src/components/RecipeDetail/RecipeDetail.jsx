import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/actionsCreator';

import Nav from '../Nav/Nav';
import Loading from '../Loading/Loading';

import styles from "./recipeDetail.module.css";
import notImage from '../../sources/no-image.jpg';

export default function RecipeDetail() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data } = useSelector(state => state.recipeDetail);

  useEffect(()=> {
    dispatch(getDetail(id));
  }, []);

  if(!data) {
    return (
      <>
        <Nav />
        <div className={styles.loading}> <Loading /> </div>
      </>
    );
  } else {
      return (
        <>
          <Nav />
          <div className={styles.container}>
            <div className={styles.header}> 
              <div className={styles.info}>
                <h3> Title: </h3>
                <span> { data.name } </span>
                <hr />
                <h3> Score: </h3>
                <span> { data.score } </span>
                <hr />
                <h3> Health Level: </h3>
                <span>   { data.health } </span>
              </div>
              <img src={ data.image ? data.image : notImage } alt={`Imagen ilustratiba del plato ${ data.name }`} />
            </div>
            <div className={styles.detail}> 
              {
                data.typeDish && data.typeDish.length > 0 ? 
                  <>
                    <h4> Types of Dishes: </h4>
                    <ul className={styles.list}>
                      {
                        data.typeDish.map((dish, i) => {
                          return <li key={i}> {dish} </li>
                        })
                      }
                    </ul> 
                  </>
                  :
                  null
              }
              {
                data.typeDiet && data.typeDiet.length > 0 ? 
                  <>
                    <h4> Types of Diets: </h4>
                    <ul className={styles.list}>
                      {
                        data.typeDiet.map((diet, i) => {
                          return <li key={i}> {diet} </li>
                        })
                      }
                    </ul> 
                  </>
                  :
                  null
              }
              {
                data.types && data.types.length > 0 ? 
                  <>
                    <h4> Types of Diets: </h4>
                    <ul className={styles.list}>
                      {
                        data.types.map((diet, i) => {
                          return <li key={i}> {diet.name} </li>
                        })
                      }
                    </ul> 
                  </>
                  :
                  null
              }
              <h4> Summary: </h4>
              <p> { data.summary.length > 0 ? data.summary : 'No hay más detalles...' } </p>
              <br />
              <h4> Steps: </h4>
              <p> { data.steps.length > 0 ? data.steps : 'Sin detalles...' } </p>
            </div>
        </div>
      </>
    );
  };
};