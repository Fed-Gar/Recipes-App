import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./recipe.module.css";

export default function Recipe({ name, type, image, id }) {
  console.log('AAAA:', image, name, id )
  return (
    <div className={styles.contRecipe}>
      <Link to={`/detail/${id}`}>
        <h2> { name } </h2>
      </Link>
      <span> { type } </span>
      <img src={ image } alt={`Imagen ilistratiba de un plato de ${name}.`} />
    </div>
  );
};