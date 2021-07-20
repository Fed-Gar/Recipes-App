import axios from 'axios';
import { GET_RECIPES, GET_RECIPE_DETAIL, ORDER_RECIPES_BY_NAME, GET_RECIPES_TYPES,
        FILTER_BY_TYPE, ORDER_RECIPES_BY_SCORE, SET_PAGINATION, CREATE, CHARGE_RECIPES } from './actions';
import { order } from './order';

export function chargeRecipes(toget = 1) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes?toget=${toget}`)
      .then(response => {
        dispatch({ type: CHARGE_RECIPES, payload: response.data })
      })
      .catch((error) => console.error(error));
  };
};

export function getRecipes(name, toget = 1) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes?name=${name}&toget=${toget}`) // sacar el toget
      .then(response => {
        console.log('DATA:', response);
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
      });
  };
};

export function create(data) {
  return function(dispatch) {
    return axios.post(`http://localhost:3001/recipes`, data)
      .then(response => {
        console.log('POST: ', response.data);
        dispatch({ type: CREATE, payload: response.data }); // veeeeeeeeer como lo tienen
      })
      .catch(error => console.log(error));
  };
};

export function orderByName(recipes, sort) {
  let sortRecipes = recipes.slice();
  return function(dispatch) {
    let result = order(sortRecipes, sort);
    dispatch({type: ORDER_RECIPES_BY_NAME, payload: result});
  };
};

export function orderByScore(recipes, sort) {
  let sortScore = recipes.slice(); 
  return function(dispatch) {
      let result = order(sortScore, sort);
      dispatch({type: ORDER_RECIPES_BY_SCORE, payload: result});
  };
};

// export function filterByType(diet, toget = 1) {
//   return function(dispatch) {
//     return axios(`http://localhost:3001/recipes/type?diet=${diet}&toget=${toget}`)
//       .then(data =>  { 
//         console.log('DATA: ', data); 
//         dispatch({type: FILTER_BY_TYPE, payload: data});
//       });
//   };
// }; 

export function filterByType(payload) {
  return function(dispatch) {
    dispatch({type: FILTER_BY_TYPE, payload});
  };
};

export function setPagination(payload) {
  return function(dispatch) {
    dispatch({type: SET_PAGINATION, payload});
  };
};