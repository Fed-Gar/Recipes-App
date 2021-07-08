import { GET_RECIPES, GET_RECIPE_DETAIL, GET_RECIPES_TYPES, ORDER_RECIPES_BY_NAME,
        FILTER_BY_TYPE, FILTER_CREATED, ORDER_RECIPES_BY_SCORE, ORDER_RECIPES_BY_TYPES,} from '../actions/actions';

const initialState = {
  recipes: 0,
  recipesLoaded: [],
  recipesTypes: [],
  filterByType: 'ALL',
  filterByCreated: false,
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