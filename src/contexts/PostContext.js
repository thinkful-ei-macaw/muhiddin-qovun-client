import React, { Component } from "react";

const PostContext = React.createContext({
  post: {},
  posts: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setPost: () => {},
  setPosts: () => {},
  addPost: () => {},
  clearPost: () => {},
  clearPosts: () => {},
});

export default PostContext;

export class PostProvider extends Component {
  state = {
    post: {},
    error: null,
    posts: [],
  };

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setPost = (post) => {
    this.setState({ post });
  };

  setPosts = (posts) => {
    this.setState({ posts });
  };

  clearPost = () => {
    this.setPost({});
    this.setPosts([]);
  };

  addPost = (post) => {
    this.setPosts([...this.state.posts, post]);
    return post;
  };

  render() {
    const value = {
      post: this.state.post,
      posts: this.state.posts,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setPost: this.setPost,
      setPosts: this.setPosts,
      clearUser: this.clearUser,
      clearPost: this.clearPost,
      addPost: this.addPost,
    };
    return (
      <PostContext.Provider value={value}>
        {this.props.children}
      </PostContext.Provider>
    );
  }
}
