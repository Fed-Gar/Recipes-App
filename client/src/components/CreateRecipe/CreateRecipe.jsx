import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Nav from '../Nav/Nav';

import { create } from '../../actions/actionsCreator';

import styles from "./createRecipe.module.css";

const regexUrl = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

function validate(state) {
  let errors = {};
  if(!state.title) {
    errors.title = 'Title is required';
  } else if (state.title.length > 4) {
    errors.username = 'Username is invalid';
  };
  if(!state.summary) {
    errors.summary = 'Summary is required';
  } else if (state.summary.length > 4) {
    errors.summary = 'Summary is invalid';
  };
  if(state.img) {
    if(regexUrl.test(state.img)) {
    errors.image = 'Image is invalid';
    };
  };
  return errors;
};

export default function CreateRecipe() {

  const [state, setState] = useState({
    title:'',
    description:'',
    type: '',
    img:'',
    place:'',
    date:'',
  });

  const [errors, setErrors] = useState({});

  const recipesTypes = useSelector(state => state.recipesTypes);
  
  const dispatch = useDispatch();

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
    dispatch(create(state));
    setState({
      title:'',
      summary:'',
      type: '',
      img: '',
      score:'',
      health:'',
    });
    setErrors({});
  };

  return (
    <>
      <Nav />
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="title" > Title </label>
          <input
              type="text"
              id="title"
              name = "title"
              minLength="4"
              value={state.title}
              autoComplete="off"
              className={styles.input}
              onChange={handleChange}
          />
          <label className={styles.label} htmlFor="summary"> Summary </label>
          <textarea 
              id='summary' 
              name="summary" 
              minLength="4"
              value={state.summary} 
              className={styles.textarea}
              onChange={handleChange}
          >
          </textarea> 
          <label className={styles.label} htmlFor="filter"> Tipo de Dieta: </label>
          <select name="filter" id="filter" onChange={handleChange}>
            {
              recipesTypes.map(type => {
                if(type.name === 'vegan') {
                  return <option value={type.name} key={type.id} > {type.name} </option>
                }
                return <option value={type.name} key={type.id} > {type.name} </option>
              })
            }
			    </select> 
          <label className={styles.label} htmlFor="score"> Score </label>
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
          <label className={styles.label} htmlFor="health"> Health </label>
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
          <label className={styles.label} htmlFor="image"> Image </label>
          <input 
              type='text'
              id='image'
              name="image"
              value={state.img}
              autoComplete="off"
              className={styles.input}
              onChange={handleChange}
          />
          <button type="submit" className={styles.button}> Crear </button>
        </form> 
    </>
  );
};