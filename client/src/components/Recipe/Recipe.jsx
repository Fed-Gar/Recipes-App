import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./recipe.module.css";
import notImage from '../../sources/no-image.jpg';

export default function Recipe({ name, type, image, id }) {
  const title = name.split(' ').splice(0, 3).join(' ') + '...';
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
                 return <> <span key={i}> {diet.name} </span> <br /> </>
              };
              return <> <span key={i}> {diet} </span> <br /> </>
            })
          :
          <span> Sin Dietas... </span>
        }
      </div>
      <img src={ image ? image : notImage } alt={`Imagen ilistratiba de un plato de ${title}.`} />
    </div>
  );
};