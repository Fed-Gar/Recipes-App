import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./recipe.module.css";

export default function Recipe({ name, type, image, id }) {
  return (
    <div className={styles.contRecipe}>
      <Link to={`/detail/${id}`}>
        { name } 
      </Link>
      {/* <span> { type } </span> */}
      <span> Type </span>
      <img src={ image } alt={`Imagen ilistratiba de un plato de ${name}.`} />
    </div>
  );
};