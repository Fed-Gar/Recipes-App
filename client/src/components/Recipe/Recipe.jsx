import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./recipe.module.css";
import notImage from '../../sources/no-image.jpg';

export default function Recipe({ name, type, image, id }) {
  const title = name.split(' ').splice(0, 3).join(' ') + '...';
  if(type && type.length > 4) type.splice(4);
  return (
    <div className={styles.contRecipe}>
      <Link to={`/detail/${id}`}>
        { title } 
      </Link>
      <div className={styles.diets}> 
        {
          type && type.length > 0 ? 
            type.map((diet, i) => {
              if(typeof diet === 'object') {
                 return <div key={i}> <span> {diet.name} </span> <br /> </div>
              };
              return <div key={i}> <span > {diet} </span> <br /> </div>
            })
          :
          <span> No Diets... </span>
        }
      </div>
      <img src={ image ? image : notImage } alt={`Imagen ilistratiba de un plato de ${title}.`} />
    </div>
  );
};