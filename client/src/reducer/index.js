import { GET_RECIPES, GET_RECIPE_DETAIL, GET_RECIPES_TYPES, ORDER_RECIPES_BY_NAME,
        FILTER_BY_TYPE, FILTER_CREATED, ORDER_RECIPES_BY_SCORE, ORDER_RECIPES_BY_TYPES,
        SET_PAGINATION, CREATE } from '../actions/actions';

const initialState = {
  numPag: 1,
  recipesLoaded: [],
  recipesTypes: [],
  filterByType: 'ALL',
  created: [],
  recipeDetail: {},
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload.length,
        recipesLoaded: payload,
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: payload,
      };
    case GET_RECIPES_TYPES:
      return {
        ...state,
        recipesTypes: payload,
      };
    case CREATE:
      return {
        ...state,
        created: [...state.created, ...payload],
      };  
    case ORDER_RECIPES_BY_NAME:
      return {
        ...state,
        recipesLoaded: payload,
      };
    case ORDER_RECIPES_BY_SCORE:
      return {
        ...state,
        recipesLoaded: payload,
      };
    case ORDER_RECIPES_BY_TYPES:
      return {
        ...state,
        recipesLoaded: payload,
      }  
    case SET_PAGINATION:
      return {
        ...state,
        numPag: payload,
      };  
    case FILTER_BY_TYPE:
      return {
        ...state,
        filterByType: payload,
      };   
    case FILTER_CREATED:
      return {
        ...state,
        filterByCreated: payload,
      };   
    default:
      return state;    
  };
};