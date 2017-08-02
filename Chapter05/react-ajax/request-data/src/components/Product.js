import React, { Component } from 'react';
import lonelyBird from '../images/lonely-bird.jpg';
import solidFriendship from '../images/solid-friendship.jpg';

class Product extends Component {
    render() {
        return (
            <div>
                <img src={this.props.product.id === 1 ? lonelyBird : solidFriendship} className="product-image" alt="product" />
                <div>
                    <h3>{this.props.product.name}</h3>
                    <div>US$ {this.props.product.price}</div>
                </div>
            </div>
        );
    }
}

export default Product;
