import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <div>
                <img src={this.props.product.image} className="product-image" alt="product" />
                <div>
                    <h3>{this.props.product.name}</h3>
                    <div>US$ {this.props.product.price}</div>
                    <div>
                        <button className={this.props.product.isSelected ? 'btn btn-danger' : 'btn btn-primary'}
                                onClick={() => {
                                  const product = this.props.product;
                                  product.isSelected = !product.isSelected;
                                  this.props.onSelect(product);
                                }}>
                            {this.props.product.isSelected ? 'Remove' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
