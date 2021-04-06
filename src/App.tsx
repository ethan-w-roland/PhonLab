import React from 'react';
import Home from './pages/Home';
import Phonology from './pages/Phonology';
import Vocab from './pages/Vocab';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Phonology">
          <Phonology/>
        </Route>
        <Route path="/Vocab">
          <Vocab/>
        </Route>
        <Route path="/Quiz">
          <Quiz/>
        </Route>
        <Route path="/Flashcards">
          <Flashcards/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;