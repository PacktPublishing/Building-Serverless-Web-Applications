import React, { Component } from 'react';

class Comment extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <strong>{this.props.comment.username}</strong> <span className="text-muted">commented {this.props.comment.age}</span>
                </div>
                <div className="panel-body">
                    {this.props.comment.text}
                </div>
            </div>
        );
    }
}

export default Comment;
