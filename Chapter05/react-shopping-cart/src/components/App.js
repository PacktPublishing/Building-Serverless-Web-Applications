import React, { Component } from 'react';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import lonelyBird from '../images/lonely-bird.jpg';
import solidFriendship from '../images/solid-friendship.jpg';

const products = [{
    id: 1,
    name: 'Lonely Bird',
    image: lonelyBird,
    price: 29.99,
    isSelected: false
}, {
    id: 2,
    name: 'Solid Friendship',
    image: solidFriendship,
    price: 19.99,
    isSelected: false
}];

class App extends Component {

    constructor() {
        super();
        this.state = {
            products: products
        };

        // bind the component's "this" to the callback
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
    }

    handleSelect(product) {
        // create a copy of the products array
        const products = this.state.products.slice();

        // find the index of the product to modify
        const index = products.map(i => i.id).indexOf(product.id);

        // modify the selection state
        products[index].isSelected = product.isSelected;

        // make React aware that the state has changed
        this.setState({products: products});
    }

    handleDeselect(product) {
        this.handleSelect(product);
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
                    <div className="col-md-8">
                        <h3>Products</h3>
                        <ProductList products={this.state.products}
                                     onSelect={this.handleSelect} />
                    </div>
                    <div className="col-md-4">
                        <h3>Shopping Cart</h3>
                        <ShoppingCart selectedProducts={this.state.products.filter(p => p.isSelected)} 
                              onDeselect={this.handleDeselect} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
