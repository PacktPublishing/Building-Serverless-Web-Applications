import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,  
  Switch
} from 'react-router-dom';

import Header from './Header';
import Product from './Product';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import Signup from './Signup';
import Login from './Login';
import NoMatch from './NoMatch';
import Error from './Error';

import Services from '../lib/services';

class App extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            ready: false,
            showModal: false
        };

        // bind the component's "this" to the callback
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleSelect(product) {
        const products = this.state.products.slice();
        const index = products.map(i => i.id).indexOf(product.id);
        products[index].isSelected = product.isSelected;

        this.setState({products: products});
    }

    handleDeselect(product) {
        this.handleSelect(product);
    }

    handleSave() {        
        const selectedProducts = this.state.products.filter(p => p.isSelected);
        Services.saveCart(selectedProducts, (err, res) => {
            if (err) alert(err);
            else this.setState({showModal: true});
        });    
    }

    handleCheckout() {     
        Services.processCheckout((err, res) => {
            if (err) alert(err);
            else this.setState({showModal: true});
        });           
    }

    handleCloseModal() {     
        this.setState({showModal: false});      
    }

    render() {

        return (
            <Router>                
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Header />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {
                                this.state.ready 
                                    ?
                                        <Switch>
                                            <Route path="/" exact render={ 
                                                () => <ProductList 
                                                        products={this.state.products} 
                                                        onSelect={this.handleSelect} /> 
                                            }/>
                                            <Route path="/product/:id" render={
                                                (props) => <Product 
                                                        product={this.state.products.find(x => x.id === props.match.params.id)}
                                                        onSelect={this.handleSelect}/>
                                            }/>
                                            <Route path="/shopping-cart" render={
                                                () => <ShoppingCart 
                                                        selectedProducts={this.state.products.filter(p => p.isSelected)} 
                                                        showModal={this.state.showModal}
                                                        onDeselect={this.handleDeselect}
                                                        onSave={this.handleSave}
                                                        onCheckout={this.handleCheckout}
                                                        onCloseModal={this.handleCloseModal} />
                                            }/>
                                            <Route path="/signup" component={Signup}/>
                                            <Route path="/login" component={Login}/>
                                            <Route path="/error" component={Error}/>
                                            <Route component={NoMatch}/>                                            
                                        </Switch>                                        
                                    :
                                        <div>
                                            <span className="glyphicon glyphicon-refresh spin"></span>
                                        </div>
                            }
                        </div>
                    </div>
                </div>
            </Router>
        );
    }

    componentDidMount() {
        Services.getProducts((err, res) => {
            if (err) {
                alert(err);
                this.setState({ready: true});
            } else {
                this.setState({ 
                    products: res.data, 
                    ready: true 
                });
            }
        });        
    }
}

export default App;
