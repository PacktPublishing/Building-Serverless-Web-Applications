import React, { Component } from 'react';
import Comment from './Comment';
import CommentBox from './CommentBox';

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
                <CommentBox productId={this.props.productId}
                            onComment={this.props.onComment} />
            </div>
        );
    }
}

export default CommentList;
