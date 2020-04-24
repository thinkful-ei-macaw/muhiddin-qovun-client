import React, { Component } from 'react';

export const nullPost = {
  post: []
}

const PostContext = React.createContext({
  post: nullPost,
  posts: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setPost: () => {},
  setPosts: () => {},
  addPost: () => {},
  clearPost: () => {},
  clearPosts: () => {}
})

export default PostContext;

export class PostProvider extends Component {
  state = {
    post: nullPost,
    error: null,
    posts: [],
  };

  setError = error => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setPost = post => {
    this.setState({ post })
  }

  setPosts = posts => {
    this.setState({ posts });
  }


  clearPost = () => {
    this.setPost(nullPost);
    this.setPosts([]);
  }


  addPost = post => {
    this.setPosts([
      ...this.state.posts,
      post
    ]);
    return post;
  }

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
      addPost: this.addPost
    }
    return (
      <PostContext.Provider value={value}>
        {this.props.children}
      </PostContext.Provider>
    )
  }
}
