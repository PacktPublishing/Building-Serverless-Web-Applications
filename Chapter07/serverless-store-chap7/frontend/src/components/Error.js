import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div className="panel-body">
                <h4 className="alert alert-danger">There was an error while processing your request.</h4>
            </div>
        );
    }
}

export default Error;
