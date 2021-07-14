import axios from 'axios';
import { GET_RECIPES, GET_RECIPE_DETAIL, ORDER_RECIPES_BY_NAME, GET_RECIPES_TYPES,
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

export function chargeRecipes(toget = 1) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes?toget=${toget}`)
      .then(response => {
        dispatch({ type: CHARGE_RECIPES, payload: response.data })
      })
      .catch((error) => console.error(error));
  };
};

export function getRecipes(name) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes?name=${name}`)
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
      });
  };
};

export function create(data) {
  return function(dispatch) {
    return axios.post(`http://localhost:3001/recipes`, data)
      .then(response => {
        console.log('POST: ', data);
        dispatch({ type: CREATE, payload: response });
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
  let sortScore = recipes.slice(); // hace una copia
  return function(dispatch) {
      let result = order(sortScore, sort);
      dispatch({type: ORDER_RECIPES_BY_SCORE, payload: result});
  };
};

export function filterByType(diet, toget = 1) {
  return function(dispatch) {
    return axios(`http://localhost:3001/recipes/type?diet=${diet}&toget=${toget}`)
      .then(data =>  { 
        console.log('DATA: ', data); 
        dispatch({type: FILTER_BY_TYPE, payload: data});
      });
  };
}; 

export function setPagination(payload) {
  return function(dispatch) {
    dispatch({type: SET_PAGINATION, payload});
  };
};