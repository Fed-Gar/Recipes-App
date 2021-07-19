import { GET_RECIPES, GET_RECIPE_DETAIL, ORDER_RECIPES_BY_NAME, GET_RECIPES_TYPES,
        FILTER_BY_TYPE, ORDER_RECIPES_BY_SCORE, SET_PAGINATION, CHARGE_RECIPES} from '../actions/actions';

const initialState = {
  numPag: 1,
  recipesLoaded: [],
  recipesFilter: [],
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
        recipesFilter: filter(payload, state.recipesLoaded),
      }; 
    default:
      return state;    
  };
};

function filter(diet, loaded) {
  const UUID = new RegExp("^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"); 
  const diets = [];
  for(let i = 0; i < loaded.length; i++) {
    if(UUID.test(loaded[i].id)) {
      for(let j = 0; j < loaded[i].types.length; j++) {
        if(loaded[i].types[j].name === diet) diets.push(loaded[i]);
      };
    } else {
        for(let h = 0; h < loaded[i].typeDiet.length; h++) {
          console.log('2', loaded[i].typeDiet[h]);
          if(loaded[i].typeDiet[h] === diet) diets.push(loaded[i]);
        };
    };
  };
  return diets;
};