import React from 'react';

import styles from "./recipe.module.css";

export default function Recipe({ name, type, image }) {
  return (
    <div className={styles.contRecipe}>
      <h2> { name } </h2>
      <span> { type } </span>
      <img src={ image } alt={`Imagen ilistratiba de un plato de ${name}.`} />
    </div>
  );
};