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
        const products = this.props.selectedProducts.map(product => {
            return (
                <ShoppingCartItem 
                    key={product.id}
                    product={product}/>
            )
        });

        const empty = <div className="alert alert-warning">Cart is empty</div>;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {products.length > 0 ? products : empty}
                    <div>Total: US$ {this.getTotal()}</div>
                    <button className='btn btn-primary'
                            onClick={() => {this.props.onSave();}}>
                      Save
                    </button>
                    {this.props.hasSaved ? <div className="hasSaved">saved</div> : ''}
                </div>
            </div>
        );
    }
}

export default ShoppingCart;
