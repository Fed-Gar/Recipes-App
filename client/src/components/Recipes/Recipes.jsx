import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Recipe from '../Recipe/Recipe';   
import Loading from '../Loading/Loading';

import { chargeRecipes } from '../../actions/actionsCreator';

import styles from "./recipes.module.css"; 

export default function Recipes() {
  const dispatch = useDispatch();

  const recipesLoaded = useSelector(state => state.recipesLoaded);
  console.log('RECIPES: ', recipesLoaded);
  
  const numPag = useSelector(state => state.numPag);

  const group = 3;
  let finalCount = numPag * group;
  let initialCount = finalCount - group;
  let recipes = recipesLoaded.slice(initialCount, finalCount);

  useEffect(()=> {
    dispatch(chargeRecipes());
  }, []);

  if(recipes.length < 1 || !recipes) {
    return <div className={styles.loading}> <Loading /> </div>
  } else if(typeof recipesLoaded === 'string') {
      dispatch(chargeRecipes());
      alert('No hay recetas...');
    } else {
        return (
          <div className={styles.contRecipes}>
            {
              recipes && recipes.map(recipe => { 
                return (
                    <Recipe key={recipe.id}
                      id={recipe.id}
                      name={recipe.name}
                      image={recipe.img}
                      type={recipe.typeDiet}
                    />
                );
              })
            }
          </div>
        );
    };
};