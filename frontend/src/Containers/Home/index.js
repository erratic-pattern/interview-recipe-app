import React, { useHistory, useLocation, useSearchParams } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Search from '../Search'
import Recipe from '../Recipe'

const Home = () => (
  <Router>
    <Switch>
      <Route path="/search/:term" children={<Search/>}/>
      <Route path="/search" children={<Search/>}/>
      <Route path="/recipe/:id" children={<Recipe/>}/>
      <Route path="/" children={<Redirect to="/search" />}/>
    </Switch>
  </Router>
)

export default Home
