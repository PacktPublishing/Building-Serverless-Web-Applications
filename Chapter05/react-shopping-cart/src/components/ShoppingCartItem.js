import React, { Component } from 'react';

class ShoppingCartItem extends Component {
    render() {
        return (
            <div className="alert alert-info">
                <span>{this.props.product.name}: US$ {this.props.product.price}</span>
                <a className="x-mark" 
                   onClick={() => {
                     const product = this.props.product;
                     product.isSelected = false;
                     this.props.onDeselect(product); 
                   }}>
                    <span className="glyphicon glyphicon-remove"></span>
                </a>
            </div>
        );
    }
}

export default ShoppingCartItem;
