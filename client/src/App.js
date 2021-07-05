import React from 'react'
import { Route, Switch } from "react-router-dom";

import Landing from './components/Landing/Landing';
// import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
// import Error404 from './components/Error/Error404';

export default function App() {
  return (
    <>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        {/* <Route path="*" component={Error404} /> */}
      </Switch>
    </>
  );
};