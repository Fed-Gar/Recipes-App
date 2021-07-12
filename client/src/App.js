import React from 'react'
import { Route, Switch } from "react-router-dom";

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import Error404 from './components/Error/Error404';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateRecipe} />
        <Route exact path="/detail/:id" component={RecipeDetail} />
        <Route path="*" component={Error404} />
      </Switch>
    </>
  );
};