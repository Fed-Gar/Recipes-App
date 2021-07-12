import axios from 'axios';
import { GET_RECIPES, GET_RECIPE_DETAIL, ORDER_RECIPES_BY_NAME, GET_RECIPES_TYPES, RESET,
        FILTER_BY_TYPE, ORDER_RECIPES_BY_SCORE, SET_PAGINATION, CREATE, CHARGE_RECIPES } from './actions';

function order(data, sort) {
  if(sort === 'menor') {
    data.sort(function(a, b) {
      if(a.score < b.score) return -1;
      if(a.nscoreame > b.score) return 1;
      return 0;
    });
  };
  if(sort === 'mayor') {
    data.sort(function(a, b) {
      if(a.score > b.score) return -1;
      if(a.score < b.score) return 1; 
      return 0;
    });
  };
  if(sort === 'aZ') {
    data.sort(function(a, b) {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
  };
  if(sort === 'zA') {
    data.sort(function(a, b) {
      if(a.name > b.name) return -1;
      if(a.name < b.name) return 1; 
      return 0;
    });
  };
  return data;
};

export function chargeRecipes() {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes`)
      .then(response => {
        dispatch({ type: CHARGE_RECIPES, payload: response.data })
      })
      .catch((error) => console.error(error));
  };
};

export function getRecipes(ingredient) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes?ingredient=${ingredient}`)
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

export function reset() {
  return function(dispatch) {
    dispatch({type: RESET});
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

export function create() {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes`)
      .then(data =>  {
        dispatch({ type: CREATE, payload: data });
      });
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

export function filterByType(type) {
  return function(dispatch) {
    dispatch({type: FILTER_BY_TYPE, payload: type});
  };
}; 

export function setPagination(payload) {
  return function(dispatch) {
    dispatch({type: SET_PAGINATION, payload});
  };
};