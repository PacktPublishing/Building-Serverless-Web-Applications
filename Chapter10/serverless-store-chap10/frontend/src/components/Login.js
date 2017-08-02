import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSignin(this.state.email, this.state.password, this.props.history);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    render() {
        return (
            <div>
                <h4>Login</h4>
                <div className="login">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email">
                            <ControlLabel>E-mail</ControlLabel>
                            <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" disabled={!this.validateForm() || this.state.isLoadingSignin }>
                                {
                                    !this.props.isLoadingSignin 
                                        ? "Login" 
                                        : "Signing in..."
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
