import React, { Component } from 'react';

class ShoppingCartItem extends Component {
    render() {
        return (
            <div className="alert alert-info">
                <span>{this.props.product.name}: US$ {this.props.product.price}</span>                
            </div>
        );
    }
}

export default ShoppingCartItem;
