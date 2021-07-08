import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../../actions/actionsCreator';

import Recipe from '../Recipe/Recipe';   

import styles from "./recipes.module.css"; 

export default function Recipes() {
  const dispatch = useDispatch();

  const recipesLoaded = useSelector(state => state.recipesLoaded);
  const numPag = useSelector(state => state.numPag);

  const group = 6;
  let finalCount = numPag * group;
  let initialCount = finalCount - group;
  let recipes = recipesLoaded.slice(initialCount, finalCount);

  useEffect(()=> {
	  dispatch(getRecipes());
  }, []);

  if(recipes.length < 1) {
    return <div className={styles.loading}> Cargando... </div>
  } else {
      return (
        <div className={styles.contRecipes}>
          {
            recipes.map(recipe => { 
              return (
                  <Recipe key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    image={recipe.img}
                    type={recipe.type}
                  />
              );
            })
          }
        </div>
      );
  };
};