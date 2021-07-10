import { GET_RECIPES, GET_RECIPE_DETAIL, ORDER_RECIPES_BY_NAME, GET_RECIPES_TYPES,
        FILTER_BY_TYPE, ORDER_RECIPES_BY_SCORE, SET_PAGINATION, CREATE, CHARGE_RECIPES} from '../actions/actions';

const initialState = {
  numPag: 1,
  recipesLoaded: [],
  recipesSearch: [],
  recipesTypes: [],
  filterByType: [],
  created: [],
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
        recipesSearch: payload,
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
        recipesLoaded: state.recipesLoaded.filter(recipe => recipe.type !== payload.type),
      }; 
    default:
      return state;    
  };
};