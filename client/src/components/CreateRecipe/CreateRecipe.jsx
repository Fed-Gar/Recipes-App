import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Nav from '../Nav/Nav';

import { create, getTypes } from '../../actions/actionsCreator';

import styles from "./createRecipe.module.css";

// const URL = new RegExp("^(http|https)://", "i");
const ALPHA = /^[a-zA-Z\s]+$/;

export function validate(state) {
  let errors = {};
  if(!state.name) {
    errors.name = 'You have to enter a title...';
  } else if (state.name.length < 4) {
      errors.name = 'The title is invalid. Must be more than 4 characters...';
  } else if(!ALPHA.test(state.name)) {
      errors.name = 'Only letters are allowed...'
  };
  if(!state.summary) {
    errors.summary = 'You have to enter a summary...';
  } else if (state.summary.length < 4) {
      errors.summary = 'The summary is invalid';
  };
  return errors;
};

export default function CreateRecipe() {
  const dispatch = useDispatch();

  const [types, setTypes] = useState({
    diets: [
      {id: 1, value: "gluten free", isChecked: false},
      {id: 2, value: "katogenic", isChecked: false},
      {id: 3, value: "lacto-vegetarian", isChecked: false},
      {id: 4, value: "ovo-vegetarian", isChecked: false},
      {id: 5, value: "paleo", isChecked: false},
      {id: 6, value: "pescetarian", isChecked: false},
      {id: 7, value: "primal", isChecked: false},
      {id: 8, value: "vegan", isChecked: false},
      {id: 9, value: "vegetarian", isChecked: false},
      {id: 10, value: "whole30", isChecked: false},
    ],
  });

  const [state, setState] = useState({
    name:'',
    summary:'',
    score:'',
    steps: '',
    health:'',
  });

  const [errors, setErrors] = useState({
    name: '',
    summary: '',
  });

  const recipesTypes = useSelector(state => state.recipesTypes);

  function handleChangeTypes(event) {
    let diets = types.diets;
    diets.forEach(diet => {
       if(diet.value === event.target.value) {
        diet.isChecked = event.target.checked;
      };
    });
    setTypes({diets: diets});
  };
  
  function handleChange(event) {
    const { name, value } = event.target;
    setErrors(validate({
      ...state,
      [name]: value
    }));
    setState({
      ...state,
      [name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = {state, types};
    dispatch(create(data));
    setState({
      name:'',
      summary:'',
      score:'',
      steps: '',
      health:'',
    });
    setErrors({
      name: '',
      summary: '',
    });
    setTypes({
      diets: [
        {id: 1, value: "gluten free", isChecked: false},
        {id: 2, value: "katogenic", isChecked: false},
        {id: 3, value: "lacto-vegetarian", isChecked: false},
        {id: 4, value: "ovo-vegetarian", isChecked: false},
        {id: 5, value: "paleo", isChecked: false},
        {id: 6, value: "pescetarian", isChecked: false},
        {id: 7, value: "primal", isChecked: false},
        {id: 8, value: "vegan", isChecked: false},
        {id: 9, value: "vegetarian", isChecked: false},
        {id: 10, value: "whole30", isChecked: false},
      ],
    });
  };

  const get = useCallback(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <>
      <Nav />
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="name" > Title: </label>
          <input
              type="text"
              id="name"
              name = "name"
              value={state.name}
              autoComplete="off"
              className={styles.input}
              onChange={handleChange}
          />
          {errors.name && (<p className={styles.danger}> {errors.name} </p>)}
          <label className={styles.label} htmlFor="summary"> Summary: </label>
          <textarea 
              id='summary' 
              name="summary" 
              value={state.summary} 
              className={styles.textarea}
              onChange={handleChange}
          >
          </textarea> 
          {errors.summary && (<p className={styles.danger}> {errors.summary} </p>)}
          <label className={styles.label} htmlFor="filter"> Types of Diets: </label>
          <div className={styles.types}>
            {
              recipesTypes.map(type => {
                return (
                  <div key={type.id} className={styles.check}>
                    <input
                      type="checkbox" 
                      id={type.name} 
                      name={type.name} 
                      value={type.name}
                      onChange={handleChangeTypes}
                    />
                    <label htmlFor={type.name}> {type.name} </label>
                  </div>
                );
              })
            }
			    </div> 
          <label className={styles.label} htmlFor="score"> Score: </label>
          <input 
              type="number"
              id='score'
              name="score"
              value={state.score}
              autoComplete="off"
              min="1" max="100" step="1"
              className={styles.input}
              onChange={handleChange}
          />
          <label className={styles.label} htmlFor="health"> Health Level: </label>
          <input 
              type='number'
              id='health'
              name="health"
              value={state.health}
              autoComplete="off"
              min="1" max="100" step="1"
              className={styles.input}
              onChange={handleChange}
          />
          <label className={styles.label} htmlFor="steps"> Steps: </label>
          <textarea 
              id='steps' 
              name="steps" 
              value={state.steps} 
              className={styles.textarea}
              onChange={handleChange}
          >
          </textarea> 
          {((!errors.name && !errors.summary) && (errors.name !== '' && errors.summary !== '')) ? 
            (<button type="submit" className={styles.button}> Create </button>) 
            : 
            <button type="submit" className={styles.disabled} disabled> Create </button>}
        </form> 
    </>
  );
};