import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,  
  Switch
} from 'react-router-dom';
import uuid from 'uuid/v4';

import Header from './Header';
import Product from './Product';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import Signup from './Signup';
import Login from './Login';
import NoMatch from './NoMatch';
import Error from './Error';

import Services from '../lib/services';
import config from '../lib/config';

class App extends Component {

    constructor() {
        super();

        this.state = {
            products: [],
            ready: false,
            showModal: false,
            isLoadingSignup: false,
            isLoadingSignin: false,
            newUser: null,
            userToken: null,
            iotClient: null,
            hasNotifications: false
        };

        // bind the component's "this" to the callback
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleConfirmSignup = this.handleConfirmSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleComments = this.handleComments.bind(this);
        this.handleIotMessages = this.handleIotMessages.bind(this);
        this.handleReadNotification = this.handleReadNotification.bind(this);
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
        const selectedProducts = this.state.products.filter(p => p.isSelected);
        Services.saveCart(selectedProducts, this.state.userToken, (err, res) => {
            if (err) alert(err);
            else this.setState({showModal: true});
        });    
    }

    handleCheckout() {     
        Services.processCheckout(this.state.userToken, (err, res) => {
            if (err) alert(err);
            else this.setState({showModal: true});
        });           
    }

    handleCloseModal() {     
        this.setState({showModal: false});      
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

                // request the products again to update the shopping cart
                Services.getProducts(res, (err, res) => {
                    if (err) alert(err);
                    else this.setState({ 
                            products: res.data, 
                            ready: true 
                        });
                }); 

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

    handleComments(comment, productId) {
        const newComment = {
            id: uuid(),
            username: 'user1337',
            age: 'a few seconds ago',
            text: comment
        };        

        Services.publishNewComment(this.state.iotClient, newComment, productId);
    }

    handleIotMessages(topic, message) {                
        if (topic === config.iot.topics.COMMENTS) {
            const msg = JSON.parse(message.toString());
            const product = this.state.products.find(p => p.id === msg.productId);
            product.comments.unshift(msg.comment);

            this.setState({
                products: this.state.products
            });
        } else {
            this.setState({hasNotifications: true});
        }
    }

    handleReadNotification() {
        this.setState({hasNotifications: false});
    }

    render() {

        return (
            <Router>                
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Header isLoggedIn={!!this.state.userToken}
                                    onLogout={this.handleLogout}
                                    hasNotifications={this.state.hasNotifications}
                                    onReadNotification={this.handleReadNotification}/>
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
                                                        onSelect={this.handleSelect}
                                                        onComment={this.handleComments} />
                                            }/>
                                            <Route path="/shopping-cart" render={
                                                () => <ShoppingCart 
                                                        selectedProducts={this.state.products.filter(p => p.isSelected)} 
                                                        showModal={this.state.showModal}
                                                        onDeselect={this.handleDeselect}
                                                        onSave={this.handleSave}
                                                        onCheckout={this.handleCheckout}
                                                        onCloseModal={this.handleCloseModal} />
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
                        </div>
                    </div>
                </div>
            </Router>
        );
    }

    componentDidMount() {

        Services.getUserToken((err, userToken) => {
            if (err) {
                alert(err);
            } else {
                this.setState({userToken: userToken});

                Services.getIotClient(userToken, this.handleIotMessages, (err, client) => {
                    if (err) alert(err);
                    else this.setState({iotClient: client})
                });

                Services.getProducts(userToken, (err, res) => {
                    if (err) {
                        alert(err);
                        this.setState({ready: true});
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
