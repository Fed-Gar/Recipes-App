import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Nav from '../Nav/Nav';

import { create } from '../../actions/actionsCreator';

import styles from "./createRecipe.module.css";

// const URL = new RegExp("^(http|https)://", "i");

export function validate(state) {
  let errors = {};
  if(!state.name) {
    errors.name = 'Tienes que ingresar un título...';
  } else if (state.name.length < 4) {
      errors.name = 'El título es inválido.';
  };
  if(!state.summary) {
    errors.summary = 'Tienes que ingresar un resumen...';
  } else if (state.summary.length < 4) {
      errors.summary = 'El resumen es inválido.';
  };
  return errors;
};

export default function CreateRecipe() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name:'',
    summary:'',
    type: [],
    score:'',
    steps: '',
    health:'',
  });

  const [errors, setErrors] = useState({
    name: '',
    summary: '',
  });

  const recipesTypes = useSelector(state => state.recipesTypes);
  
  function handleChange(event) {
    const { name, value } = event.target;
    setErrors(validate({
      ...state,
      [name]: value
    }));
    setState({
      ...state,
      [name]:value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(create(state));
    setState({
      name:'',
      summary:'',
      type: [],
      score:'',
      steps: '',
      health:'',
    });
    setErrors({
      name: '',
      summary: '',
    });
  };

  return (
    <>
      <Nav />
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="name" > Título: </label>
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
          <label className={styles.label} htmlFor="summary"> Resumen: </label>
          <textarea 
              id='summary' 
              name="summary" 
              value={state.summary} 
              className={styles.textarea}
              onChange={handleChange}
          >
          </textarea> 
          {errors.summary && (<p className={styles.danger}> {errors.summary} </p>)}
          <label className={styles.label} htmlFor="filter"> Tipo de Dieta: </label>
          <div className={styles.types}>
            {
              recipesTypes.map(type => {
                return (
                  <div key={type.id} className={styles.check}>
                    <input
                      type="checkbox" 
                      id={type.name} 
                      name={type.name} 
                      value={type.name}/>
                    <label htmlFor={type.name}> {type.name} </label>
                  </div>
                );
              })
            }
			    </div> 
          <label className={styles.label} htmlFor="score"> Puntuación: </label>
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
          <label className={styles.label} htmlFor="health"> Nivel de salud: </label>
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
          <label className={styles.label} htmlFor="steps"> Paso a paso: </label>
          <textarea 
              id='steps' 
              name="steps" 
              value={state.steps} 
              className={styles.textarea}
              onChange={handleChange}
          >
          </textarea> 
          {((!errors.name && !errors.summary) && (errors.name !== '' && errors.summary !== '')) ? 
            (<button type="submit" className={styles.button}> Crear </button>) 
            : 
            <button type="submit" className={styles.disabled} disabled> Crear </button>}
        </form> 
    </>
  );
};