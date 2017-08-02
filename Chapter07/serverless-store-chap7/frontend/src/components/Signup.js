import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0;
    }

    render() {
        return (
            <div>
                <h4>Signup</h4>
                <div className="signup">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email">
                            <ControlLabel>E-mail</ControlLabel>
                            <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup controlId="confirmPassword">
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl type="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
                        </FormGroup>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" disabled={!this.validateForm()}>
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;
