import { GET_RECIPES, GET_RECIPE_DETAIL, GET_RECIPES_TYPES, ORDER_RECIPES_BY_NAME,
        FILTER_BY_TYPE, FILTER_CREATED, ORDER_RECIPES_BY_SCORE, } from './actions';

const baseURL = process.env.REACT_APP_API;

function order(data, sort) {
  if(sort === 'ASC') {
    data.sort(function(a, b) {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
  };
  if(sort === 'DESC') {
    data.sort(function(a, b) {
      if(a.name > b.name) return -1;
      if(a.name < b.name) return 1; 
      return 0;
    });
  return data;
};

export function getRecipes(offset, limit) {
  return function(dispatch) {
    return fetch(`${baseURL}/recipes/?offset=${offset}&limit=${limit}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_RECIPES, payload: json })
      })
      .catch((error) => console.error(error));
  };
};

export function getDetail(id) {
  return function(dispatch) {
    return fetch(`${baseURL}/recipes/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_RECIPE_DETAIL, payload: json });
      })
      .catch((error) => console.error(error));
  };
};

export function getTypes() {
  return function(dispatch) {
    return fetch(`${baseURL}/types/`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_RECIPES_TYPES, payload: json });
      });
  };
};

export function orderByName(recipes, sort) {
  let sortRecipes = recipes.slice();
  return function(dispatch) {
    order(sortRecipes, sort);
    dispatch({type: ORDER_RECIPES_BY_NAME, payload: sortRecipes});
  };
};

export function orderByScore(types, sort) {
  let sortScore = types.slice();
  return function(dispatch) {
      order(sortScore, sort);
      dispatch({type: ORDER_RECIPES_BY_SCORE, payload: sortScore});
    };
  };
};

export function filterByType(filter) {
  return function(dispatch) {
    dispatch({type: FILTER_BY_TYPE, payload: filter});
  };
}; 

export function filterByPersonalization(filter) {
  return function(dispatch) {
    dispatch({type: FILTER_CREATED, payload: filter});
  };
};