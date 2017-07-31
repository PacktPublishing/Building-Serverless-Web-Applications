import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

const apiAddress = 'https://abc123.execute-api.us-east-1.amazonaws.com';
const stage = 'dev';
const service = 'store/products';

class App extends Component {

    constructor() {
        super();

        this.state = {
            products: [],
            ready: false
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Serverless Store</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.state.ready 
                                ? 
                                    <div>
                                        <h3>Products</h3>
                                        <ProductList products={this.state.products}/>
                                    </div>
                                : 
                                    <div>
                                        <span className="glyphicon glyphicon-refresh spin"></span>
                                    </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {

        axios
            .get(`${apiAddress}/${stage}/${service}`)
            .then(res => {
                this.setState({ 
                    products: res.data.products, 
                    ready: true 
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default App;
