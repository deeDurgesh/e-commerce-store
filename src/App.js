import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Default from './components/Default';
import Cart from './components/Cart';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact="true" component={ProductList} />
        <Route path="/details" exact="true" component={Details} />
        <Route path="/cart" exact="true" component={Cart} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>    
  );
}

export default App;
