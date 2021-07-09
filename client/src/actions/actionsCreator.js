import axios from 'axios';
import { GET_RECIPES, GET_RECIPE_DETAIL, GET_RECIPES_TYPES, ORDER_RECIPES_BY_NAME,
        FILTER_BY_TYPE, FILTER_CREATED, ORDER_RECIPES_BY_SCORE, ORDER_RECIPES_BY_TYPES,
        SET_PAGINATION, CREATE } from './actions';

const { BASE_URL, BASE_URL_TYPES } = process.env;

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

export function getRecipes() {
  return function(dispatch) {
    return axios(`${BASE_URL}`)
      .then(response => {
        dispatch({ type: GET_RECIPES, payload: response.data })
      })
      .catch((error) => console.error(error));
  };
};

export function getDetail(id) {
  return function(dispatch) {
    return axios(`${BASE_URL}/${id}`)
      .then(data => {
        dispatch({ type: GET_RECIPE_DETAIL, payload: data });
      })
      .catch((error) => console.error(error));
  };
};

export function getTypes() {
  return function(dispatch) {
    return axios(`${BASE_URL_TYPES}`)
      .then(response =>  {
        dispatch({ type: GET_RECIPES_TYPES, payload: response.data });
      });
  };
};

export function create() {
  return function(dispatch) {
    return axios(`${BASE_URL}`)
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

export function orderByType(types, sort) {
  let sortScore = types.slice();
  return function(dispatch) {
      let result = order(sortScore, sort);
      dispatch({type: ORDER_RECIPES_BY_TYPES, payload: result});
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

export function setPagination(payload) {
  return function(dispatch) {
    dispatch({type: SET_PAGINATION, payload});
  };
};