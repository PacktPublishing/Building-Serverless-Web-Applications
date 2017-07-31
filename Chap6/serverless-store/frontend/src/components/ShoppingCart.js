import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import ShoppingCartItem from './ShoppingCartItem';

class ShoppingCart extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            modalMessage: {}
        };

        this.closeModal = this.closeModal.bind(this);
        this.save = this.save.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    getTotal() {
        return this.props
                   .selectedProducts
                   .map(p => p.price)
                   .reduce((a, b) => a + b, 0);
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    save() {
        const modalMessage = {
            title: "Your cart was saved",
            body: "You can see your saved items in your next login."
        };

        this.setState({ showModal: true, modalMessage: modalMessage });
        this.props.onSave();
    }

    checkout() {
        const modalMessage = {
            title: "Your order has been sent",
            body: "However, this is a demo and you will not receive anything 😢"
        };

        this.setState({ showModal: true, modalMessage: modalMessage });
        this.props.onCheckout();
    }

    render() {
        const onDeselect = this.props.onDeselect;
        const products = this.props.selectedProducts.map(product => {
            return (
                <ShoppingCartItem 
                    key={product.id}
                    product={product}
                    onDeselect={onDeselect} />
            )
        });

        const empty = <div className="alert alert-warning">Shopping Cart is empty</div>;

        return (
            <div>
                <h4>Shopping Cart</h4>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {products.length > 0 ? products : empty}
                        <div>Total: US$ {this.getTotal()}</div>
                        <button className="btn btn-primary shopping-button"
                            onClick={() => {this.save();}}>
                            Save
                        </button>
                        <button className="btn btn-primary shopping-button"
                            onClick={() => {this.checkout();}}>
                            Checkout
                        </button>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalMessage.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.modalMessage.body}</p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ShoppingCart;
