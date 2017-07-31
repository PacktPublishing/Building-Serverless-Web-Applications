import React, { Component } from 'react';
import ShoppingCartItem from './ShoppingCartItem';

class ShoppingCart extends Component {
    getTotal() {
        return this.props
                   .selectedProducts
                   .map(p => p.price)
                   .reduce((a, b) => a + b, 0);
    }

    render() {
        const onDeselect = this.props.onDeselect;
        const products = this.props.selectedProducts.map(product => {
            return (
                <ShoppingCartItem 
                    key={product.id}
                    product={product}
                    onDeselect={onDeselect} />
            )
        });

        const empty = <div className="alert alert-warning">Shopping Cart is empty</div>;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {products.length > 0 ? products : empty}
                    <div>Total: US$ {this.getTotal()}</div>
                </div>
            </div>
        );
    }
}

export default ShoppingCart;
