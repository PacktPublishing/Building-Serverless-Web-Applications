import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductList extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to='/product/1'>
                            Product 1
                        </Link>
                    </li>
                    <li>
                        <Link to='/product/2'>
                            Product 2
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ProductList;
