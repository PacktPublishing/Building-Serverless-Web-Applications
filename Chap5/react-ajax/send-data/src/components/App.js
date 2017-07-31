import React, { Component } from 'react';
import axios from 'axios';
import ShoppingCart from './ShoppingCart';

const apiAddress = 'https://abc0123456.execute-api.us-east-1.amazonaws.com';
const stage = 'dev';
const service = 'shopping-cart/save';

const products = [{
    id: 1,
    name: 'Lonely Bird',
    price: 29.99,
    isSelected: true
}, {
    id: 2,
    name: 'Solid Friendship',
    price: 19.99,
    isSelected: true
}];

class App extends Component {

    constructor() {
        super();

        this.state = {
            products: products,
            hasSaved: false
        };

        // bind the component's "this" to the callback
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {        
        axios
            .post(`${apiAddress}/${stage}/${service}`, {
                products: this.state.products
            })
            .then(res => {
                this.setState({ 
                    products: this.state.products, 
                    hasSaved: true 
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Serverless Store</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Shopping Cart</h3>
                        <ShoppingCart 
                            selectedProducts={this.state.products.filter(p => p.isSelected)} 
                            hasSaved={this.state.hasSaved}
                            onSave={this.handleSave} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
