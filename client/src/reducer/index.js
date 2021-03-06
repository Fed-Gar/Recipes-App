import { GET_RECIPES, GET_RECIPE_DETAIL, ORDER_RECIPES_BY_NAME, GET_RECIPES_TYPES,
        FILTER_BY_TYPE, ORDER_RECIPES_BY_SCORE, SET_PAGINATION, CHARGE_RECIPES} from '../actions/actions';

import { order } from './utils/order';
  
const initialState = {
  numPag: 1,
  recipesLoaded: [],
  recipesTypes: [],
  recipeDetail: {},
};

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case CHARGE_RECIPES:
      return {
        ...state,
        recipesLoaded: payload,
      };
    case GET_RECIPES:
      return {
        ...state,
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
      case ORDER_RECIPES_BY_NAME:
      return {
        ...state,
        recipesLoaded: order(payload.recipes, payload.sort),
      };
    case ORDER_RECIPES_BY_SCORE:
      return {
        ...state,
        recipesLoaded: order(payload.recipes, payload.sort),
      };
    case SET_PAGINATION:
      return {
        ...state,
        numPag: payload,
      };  
    case FILTER_BY_TYPE:
      return {
        ...state,
        recipesLoaded: payload,
      }; 
    default:
      return state;    
  };
};