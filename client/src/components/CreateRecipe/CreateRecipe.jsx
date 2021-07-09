import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { create } from '../../actions/actionsCreator';

import styles from "./createRecipe.module.css";

function validate(state) {
  let errors = {};
  if (!state.title) {
    errors.title = 'Title is required';
  } else if (state.title.length > 4) {
    errors.username = 'Username is invalid';
  };
  if (!state.summary) {
    errors.summary = 'Summary is required';
  } else if (state.summary.length > 4) {
    errors.summary = 'Summary is invalid';
  };
  return errors;
};

export default function CreateRecipe() {

  const [state, setState] = useState({
    title:'',
    description:'',
    img:'',
    place:'',
    date:'',
  });

  const [errors, setErrors] = useState({});

  const recipesTypes = useSelector(state => state.recipesTypes);
  // o lo hago con el use efect o con esto ...(?
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
    event.preventDefault();
    create(state);
    setState({
      title:'',
      summary:'',
      img: '',
      score:'',
      health:'',
    });
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="title" > Title </label>
        <input
            type="text"
            id="title"
            name = "title"
            minlength="4"
            value={state.title}
            autoComplete="off"
            className={styles.input}
            onChange={handleChange}
        />
        <label className={styles.label} htmlFor="summary"> Summary </label>
        <textarea 
            id='summary' 
            name="summary" 
            value={state.summary} 
            className={styles.textarea}
            onChange={handleChange}
        >
        </textarea>  
        <label className={styles.label} htmlFor="score"> Score </label>
        <input 
            type="number"
            id='score'
            name="score"
            value={state.score}
            autoComplete="off"
            className={styles.input}
            onChange={handleChange}
        />
        <label className={styles.label} htmlFor="health"> Health </label>
        <input 
            type='text'
            id='health'
            name="health"
            value={state.health}
            autoComplete="off"
            className={styles.input}
            onChange={handleChange}
        />
        <button type="submit" className={styles.button}> Add </button>
      </form>
    </div>  
  );
};