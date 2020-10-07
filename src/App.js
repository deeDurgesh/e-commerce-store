import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Default from './components/Default';
import Cart from './components/Cart';
import {Switch,Route} from 'react-router-dom';
import Model from './components/Model';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact={true} component={ProductList} />
        <Route path="/details" exact={true} component={Details} />
        <Route path="/cart" exact={true} component={Cart} />
        <Route component={Default} />
      </Switch>
      <Model />
    </React.Fragment>    
  );
}

export default App;
