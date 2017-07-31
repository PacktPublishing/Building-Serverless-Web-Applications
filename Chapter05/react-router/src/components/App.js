import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Product from './Product';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import NoMatch from './NoMatch';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <Switch>
                        <Route path="/" exact component={ProductList}/>
                        <Route path="/product/:id" component={Product}/>
                        <Route path="/shopping-cart" component={ShoppingCart}/>
                        <Route component={NoMatch}/>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
