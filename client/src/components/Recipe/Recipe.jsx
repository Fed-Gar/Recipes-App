import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./recipe.module.css";

export default function Recipe({ name, type, image, id }) {
  const title = name.split(' ').splice(0, 3).join(' ') + '...';
  return (
    <div className={styles.contRecipe}>
      <Link to={`/detail/${id}`}>
        { title } 
      </Link>
      {/* <span> { type } </span> */}
      <span> Type </span>
      <img src={ image } alt={`Imagen ilistratiba de un plato de ${name}.`} />
    </div>
  );
};