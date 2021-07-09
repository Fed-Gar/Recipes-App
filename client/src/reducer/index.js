import { GET_RECIPES, GET_RECIPE_DETAIL, ORDER_RECIPES_BY_NAME,
        FILTER_BY_TYPE, ORDER_RECIPES_BY_SCORE, SET_PAGINATION, CREATE, } from '../actions/actions';

const initialState = {
  numPag: 1,
  recipesLoaded: [],
  recipesTypes: [],
  filterByType: [],
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
    case SET_PAGINATION:
      return {
        ...state,
        numPag: payload,
      };  
    case FILTER_BY_TYPE:
      return {
        ...state,
        filterByType: recipesLoaded.filter(),
      }; 
    default:
      return state;    
  };
};