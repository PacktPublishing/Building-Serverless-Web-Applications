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
                <h4 className="comment-list-title">Customer Reviews</h4>
                {comments}
            </div>
        );
    }
}

export default CommentList;
