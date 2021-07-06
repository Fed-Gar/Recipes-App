import { GET_RECIPES, GET_RECIPE_DETAIL, GET_RECIPES_TYPES, ORDER_RECIPES_BY_NAME,
        FILTER_BY_TYPE, FILTER_BY_PERSONALIZATION, CREATE_RECIPE } from './actions';
 
export function addRecipe({name, summary, steps, health, score}) { 
    return { 
        type: CREATE_RECIPE,
        payload: {
            name,
            summary,
            score,
            health,
            steps,
        }
    };
};