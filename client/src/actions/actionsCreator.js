import axios from 'axios';
// import { order } from './order';
import { GET_RECIPES, GET_RECIPE_DETAIL, ORDER_RECIPES_BY_NAME, GET_RECIPES_TYPES,
        FILTER_BY_TYPE, ORDER_RECIPES_BY_SCORE, SET_PAGINATION, CREATE, CHARGE_RECIPES } from './actions';

export function chargeRecipes(toget = 3) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes?toget=${toget}`)
      .then(response => {
        dispatch({ type: CHARGE_RECIPES, payload: response.data })
      })
      .catch((error) => console.error(error));
  };
};

export function getRecipes(name, toget = 3) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes?name=${name}&toget=${toget}`) 
      .then(response => {
        dispatch({ type: GET_RECIPES, payload: response.data })
      })
      .catch((error) => console.error(error));
  };
};

export function getDetail(id) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes/${id}`)
      .then(data => {
        dispatch({ type: GET_RECIPE_DETAIL, payload: data });
      })
      .catch((error) => console.error(error));
  };
};

export function getTypes() {
  return function(dispatch) {
    return axios(`http://localhost:3001/types`)
      .then(response =>  {
        dispatch({ type: GET_RECIPES_TYPES, payload: response.data });
      })
      .catch(error => console.log(error));
  };
};

export function create(data) {
  return function(dispatch) {
    return axios.post(`http://localhost:3001/recipes`, data)
      .then(response => {
        dispatch({ type: CREATE, payload: response.data });
      })
      .catch(error => console.log(error));
  };
};

// export function orderByName(recipes, sort) {
//   let sortRecipes = recipes.slice();
//   return function(dispatch) {
//     let result = order(sortRecipes, sort);
//     dispatch({type: ORDER_RECIPES_BY_NAME, payload: result});
//   };
// };

// export function orderByScore(recipes, sort) {
//   let sortScore = recipes.slice(); 
//   return function(dispatch) {
//       let result = order(sortScore, sort);
//       dispatch({type: ORDER_RECIPES_BY_SCORE, payload: result});
//   };
// };

export function orderByName(recipes, sort) {
  return function(dispatch) {
    dispatch({type: ORDER_RECIPES_BY_NAME, payload: {recipes, sort}});
  };
};

export function orderByScore(recipes, sort) {
  return function(dispatch) {
      dispatch({type: ORDER_RECIPES_BY_SCORE, payload: {recipes, sort}});
  };
};

export function filterByType(diet, toget = 1) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes/type?diet=${diet}&toget=${toget}`)
      .then(res =>  { 
        dispatch({type: FILTER_BY_TYPE, payload: res.data});
      });
  };
}; 

export function setPagination(payload) {
  return function(dispatch) {
    dispatch({type: SET_PAGINATION, payload});
  };
};