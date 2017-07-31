import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';

class Product extends Component {
    render() {

        let product = null;
        if (this.props.product) {
            product = 
                <div>
                    <Link to={`/product/${this.props.product.id}`}>
                        <img src={this.props.product.image} className="product-image" alt="product" />
                    </Link>
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
        } else {
            product = 
                <div className="panel-body">
                    <h4 className="alert alert-warning">Product not found</h4>
                </div>
        }

        return (
            <div className="row">
                <div className="col-md-4">
                    {this.props.fromList ? "": <h4>Product</h4>}
                    <div className="product-box product-display">                
                        {product}
                    </div>
                </div>
                <div className="col-md-8">
                    {this.props.fromList ? "": <CommentList comments={this.props.product.comments} 
                                                            productId={this.props.product.id}
                                                            onComment={this.props.onComment} />}
                </div>
            </div>
        );
    }
}

export default Product;
