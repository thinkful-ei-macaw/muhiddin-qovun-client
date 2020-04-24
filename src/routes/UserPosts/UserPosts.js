import React, { Component } from 'react';
import PostContext from '../../contexts/PostContext';
import PostApiService from '../../services/post-api-service';
import PostListItem from '../../components/PostListItem/PostListItem';
import './UserPosts.css'

export default class UserPosts extends Component {
  
  static contextType = PostContext;


  componentDidMount() {

    this.context.clearError();

    PostApiService.getUserPosts()
      .then(this.context.setPosts)
      .catch(this.context.setError);    
    
  }

  componentWillUnmount() {
    this.context.clearPost()
  }


  render() {
    const { posts } = this.context;
    return (      
      <div className="UserPosts">        
        {posts.map(post =>
        (<PostListItem
          key={post.post_id}
          post={post}
        />)
        )}
      </div>
      )
  }
}