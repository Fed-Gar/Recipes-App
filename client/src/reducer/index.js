import { GET_RECIPES, GET_RECIPE_DETAIL, GET_RECIPES_TYPES, ORDER_RECIPES_BY_NAME,
  FILTER_BY_TYPE, FILTER_BY_PERSONALIZATION, CREATE_RECIPE } from '../actions/actions';

const initialState = [];

export default function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case CREATE_RECIPE:
      return [...state, {
        name: payload.name,
        summary: payload.summary,
        score: payload.score,
        health: payload.health,
        steps: payload.steps,
      }];
    default:
      return state;    
  }
};