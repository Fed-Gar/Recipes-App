import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Recipe from '../Recipe/Recipe';   
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';

import { chargeRecipes } from '../../actions/actionsCreator';

import styles from "./recipes.module.css"; 

export default function Recipes() {
  const dispatch = useDispatch();

  const recipesLoaded = useSelector(state => state.recipesLoaded);
  
  const numPag = useSelector(state => state.numPag);

  const group = 3;
  let finalCount = numPag * group;
  let initialCount = finalCount - group;
  let recipes = recipesLoaded.slice(initialCount, finalCount);

  const charge = useCallback(() => {
    dispatch(chargeRecipes());
  }, [dispatch]);

  useEffect(()=> {
    charge();
  }, [charge]);

  if(recipes.length < 1 || !recipes) {
    return <div className={styles.loading}> <Loading /> </div>
  } else if(typeof recipesLoaded === 'string') {
      return <Modal />
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
                      type={recipe.typeDiet || recipe.types}
                    />
                );
              })
            }
          </div>
        );
    };
};