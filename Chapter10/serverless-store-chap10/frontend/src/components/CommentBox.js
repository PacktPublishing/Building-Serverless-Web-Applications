import React, { Component } from 'react';

class CommentBox extends Component {

    constructor() {
        super();

        this.state = {
            input: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({input: e.target.value});
    }

    handleClick() { 
        this.props.onComment(this.state.input, this.props.productId);
        this.setState({input: ''});
    }

    render() {
        return (
            <div className="comment-box">
                <input type="text" className="panel-body" 
                       onChange={this.handleChange} value={this.state.input}
                       placeholder="Please, write your review of this product" />
                <button className="btn btn-primary"
                        onClick={this.handleClick}>
                    <i className="glyphicon glyphicon-share-alt"></i> Send
                </button>
            </div>
        );
    }
}

export default CommentBox;
