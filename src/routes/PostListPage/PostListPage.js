import React, { Component } from 'react';
import PostListContext from '../../contexts/PostListContext';
import PostApiService from '../../services/post-api-service';
import { Section } from '../../components/Utils/Utils';
import PostListItem from '../../components/PostListItem/PostListItem';
import './PostListPage.css'

export default class PostListPage extends Component {
  static contextType = PostListContext;

  componentDidMount() {
    this.context.clearError()
    PostApiService.getPosts()
      .then(this.context.setPostList)
      .catch(this.context.setError)
  }

  renderPosts() {
    const section = this.props.match.params.section; 
    const { postList = [] } = this.context;
    // eslint-disable-next-line array-callback-return
    return postList.map(post => {
      if(post.section.toLowerCase() === section)
        return (<PostListItem
          key={post.post_id}
          post={post}
        />)
    })
  }

  render() {
    const { error } = this.context
    return (
      <Section list className='PostListPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderPosts()}
      </Section>
    )
  }
}
