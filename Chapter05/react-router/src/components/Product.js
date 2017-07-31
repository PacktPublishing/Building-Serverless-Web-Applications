import React, { Component } from 'react';

class ProductDetails extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h4>Product Details for ID: {this.props.match.params.id}</h4>
                </div>
            </div>
        );
    }
}

export default ProductDetails;
