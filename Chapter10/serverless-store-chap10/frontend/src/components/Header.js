import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    closeModal() {
        this.setState({ showModal: false });
        this.props.onReadNotification();
    }

    openModal() {
        this.setState({ showModal: true });        
    }

    render() {
        return (
            <Navbar collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Serverless Store</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to="/">
                            <NavItem>Home</NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/shopping-cart">
                            <NavItem>Shopping Cart</NavItem>
                        </LinkContainer>
                    </Nav>
                    {
                        this.props.isLoggedIn
                            ?
                                <Nav pullRight>
                                    <NavItem onClick={this.props.onLogout}>
                                        Logout
                                    </NavItem>
                                    <NavItem id="notification" onClick={() => this.openModal()}>
                                        <div className={this.props.hasNotifications ? "new-notification" : ""}>
                                            <span className="glyphicon glyphicon-bell"></span>
                                        </div>
                                    </NavItem>
                                </Nav>
                            :
                                <Nav pullRight>
                                    <LinkContainer to="/signup">
                                        <NavItem>Signup</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <NavItem>Login</NavItem>
                                    </LinkContainer>
                                    <NavItem id="notification" onClick={() => this.openModal()}>
                                        <span className="glyphicon glyphicon-bell"></span>
                                    </NavItem>
                                </Nav>
                    }
                    <Modal show={this.state.showModal} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Notifications</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.props.hasNotifications
                                    ? <p>This notification was triggered by a Lambda function</p>
                                    : <p>There is no new notification</p>
                            }
                        </Modal.Body>
                    </Modal>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
