import React, { Component } from 'react';
import Product from './Product';

class ProductList extends Component {
    render() {
        const onSelect = this.props.onSelect;
        const productList = this.props.products.map(product => {
            return (
                <div key={product.id} className="product-display">
                    <Product 
                        product={product}
                        fromList={true}
                        onSelect={onSelect} />
                </div>
            )
        });

        return (
            <div>
                <h4>List of Products</h4>
                {productList}
            </div>
        );
    }
}

export default ProductList;
