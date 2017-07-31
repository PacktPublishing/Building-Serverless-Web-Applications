import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {
    render() {

        const comments = this.props.comments.map(comment => {
            return (
                <div key={comment.id}>
                    <Comment comment={comment} />
                </div>
            )
        });

        return (
            <div>
                <h4>Customer Reviews</h4>
                {comments}
                <h4>You need to be logged in to review this product</h4>
            </div>
        );
    }
}

export default CommentList;
