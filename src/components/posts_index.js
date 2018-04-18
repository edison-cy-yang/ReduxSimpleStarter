import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';

class PostsIndex extends Component {
    //this function will be called by react life cycle immediately after this component is loaded
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        //since now the list of posts is not an array anymore, need to use lodash's map function
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

//when we want to map anything from application state into component, need mapStateToProps
function mapStateToProps(state) {
    return { posts: state.posts };
}

//connect action creater to the component
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);