import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../Loading/Loading';

import Recipe from '../Recipe/Recipe';   

import { chargeRecipes } from '../../actions/actionsCreator';

import styles from "./recipes.module.css"; 

export default function Recipes() {
  const dispatch = useDispatch();

  const recipesLoaded = useSelector(state => state.recipesLoaded);
  const recipesSearch = useSelector(state => state.recipesSearch);
  const numPag = useSelector(state => state.numPag);

  let search;
  const group = 6;
  let finalCount = numPag * group;
  let initialCount = finalCount - group;
  let recipes = recipesLoaded.slice(initialCount, finalCount);
  if(recipesSearch.length > 0) search = recipesSearch.slice(initialCount, finalCount);

  useEffect(()=> {
        dispatch(chargeRecipes());
  }, []);

  if(recipes.length < 1) {
    return <div className={styles.loading}> <Loading /> </div>
  } else {
      return (
        <div className={styles.contRecipes}>
          {
          search && search.length > 0 ? 
              search.map(recipe => {
                return (
                  <Recipe key={recipe.id}
                    id={recipe.id}
                    name={recipe.title}
                    image={recipe.image}
                  />
                )
              })
              :
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