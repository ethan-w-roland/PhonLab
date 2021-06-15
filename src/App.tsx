import {Suspense, lazy} from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Generic from './pages/Generic';

const Home = lazy(() => import('./pages/Home'))
const Phonology = lazy(() => import('./pages/Phonology'))
const Vocab = lazy(() => import('./pages/Vocab'))
const Flashcards = lazy(() => import('./pages/Flashcards'))
const Quiz = lazy(() => import('./pages/Quiz'))


const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Generic/>}>
        <Switch>
          <Route path="/Phonology"component={Phonology}/>
          <Route path="/Vocab"component={Vocab}/>
          <Route path="/Quiz" component={Quiz}/>
          <Route path="/Flashcards" component={Flashcards}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;