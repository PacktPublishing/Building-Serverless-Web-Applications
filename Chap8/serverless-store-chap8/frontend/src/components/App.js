import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,  
  Switch
} from 'react-router-dom';

import Header from './Header';
import Product from './Product';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import Signup from './Signup';
import Login from './Login';
import NoMatch from './NoMatch';
import Error from './Error';

import Services from '../lib/services';

class App extends Component {

    constructor() {
        super();

        this.state = {
            products: [],
            ready: false,
            hasError: false,
            isLoadingSignup: false,
            isLoadingSignin: false,
            newUser: null,
            userToken: null
        };

        // bind the component's "this" to the callback
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleConfirmSignup = this.handleConfirmSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleSelect(product) {
        const products = this.state.products.slice();
        const index = products.map(i => i.id).indexOf(product.id);
        products[index].isSelected = product.isSelected;

        this.setState({products: products});
    }

    handleDeselect(product) {
        this.handleSelect(product);
    }

    handleSave() {    
        Services.saveCart((err, res) => {
            if (err) {
                console.error(err);
                this.setState({hasError: true});
            }
        });    
    }

    handleCheckout() {     
        Services.processCheckout((err, res) => {
            if (err) {
                console.error(err);
                this.setState({hasError: true});
            }
        });           
    }

    handleSignup(email, password) {
        this.setState({isLoadingSignup: true});
        Services.signup(email, password, (err, res) => {
            this.setState({isLoadingSignup: false});

            if (err) alert(err);
            else this.setState({newUser: res.user});
        });
    }

    handleConfirmSignup(confirmationCode, history) {
        this.setState({isLoadingSignup: true});
        Services.confirmSignup(this.state.newUser, confirmationCode, (err, res) => {
            this.setState({isLoadingSignup: false});

            if (err) alert(err);
            else history.push('/');
        });
    }

    handleLogin(email, password, history) {
        this.setState({isLoadingSignin: true});
        Services.login(email, password)
            .then(res => {
                this.setState({isLoadingSignin: false, userToken: res});
                history.push('/');
            })
            .catch(err => {
                this.setState({isLoadingSignin: false});
                alert(err);
            })
    }

    handleLogout() {
        Services.logout();
        this.setState({userToken: null});
    }

    render() {

        return (
            <Router>                
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Header isLoggedIn={!!this.state.userToken}
                                    onLogout={this.handleLogout}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {
                                this.state.ready 
                                    ?
                                        <Switch>
                                            <Route path="/" exact render={ 
                                                () => <ProductList 
                                                        products={this.state.products} 
                                                        onSelect={this.handleSelect} /> 
                                            }/>
                                            <Route path="/product/:id" render={
                                                (props) => <Product 
                                                        product={this.state.products.find(x => x.id === props.match.params.id)}
                                                        onSelect={this.handleSelect}/>
                                            }/>
                                            <Route path="/shopping-cart" render={
                                                () => <ShoppingCart 
                                                        selectedProducts={this.state.products.filter(p => p.isSelected)} 
                                                        onDeselect={this.handleDeselect}
                                                        onSave={this.handleSave}
                                                        onCheckout={this.handleCheckout} />
                                            }/>
                                            <Route path="/signup" render={
                                                (props) => <Signup
                                                            {...props}
                                                            isLoadingSignup={this.state.isLoadingSignup}
                                                            newUser={this.state.newUser}
                                                            onSignup={this.handleSignup}
                                                            onConfirmSignup={this.handleConfirmSignup} />
                                            }/>
                                            <Route path="/login" render={
                                                (props) => <Login
                                                            {...props} 
                                                            isLoadingSignin={this.state.isLoadingSignin} 
                                                            onSignin={this.handleLogin} />
                                            }/>
                                            <Route path="/error" component={Error}/>
                                            <Route component={NoMatch}/>                                            
                                        </Switch>                                        
                                    :
                                        <div>
                                            <span className="glyphicon glyphicon-refresh spin"></span>
                                        </div>
                            }
                            {
                                this.state.hasError
                                    ?
                                        <Redirect to="/error"/>
                                    :
                                        ""
                            }
                        </div>
                    </div>
                </div>
            </Router>
        );
    }

    componentDidMount() {

        Services.getUserToken((err, res) => {
            if (err) {
                console.error(err);
            } else {
                this.setState({userToken: res});
                Services.getProducts((err, res) => {
                    if (err) {
                        console.error(err);
                        this.setState({ready: true, hasError: true});
                    } else {
                        this.setState({ 
                            products: res.data, 
                            ready: true 
                        });
                    }
                }); 
            }
        })
    }
}

export default App;
