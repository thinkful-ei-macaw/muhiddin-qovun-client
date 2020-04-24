import React from 'react';
import PostContext from '../../contexts/PostContext';
import PostApiService from '../../services/post-api-service';
import { Button } from '../../components/Utils/Utils';
import './PostForm.css';


class PostForm extends React.Component {
  
  static contextType = PostContext;
  
  handleSubmit = event => {
    event.preventDefault()
    
    const { title, content, section } = event.target;
  

    PostApiService.postPost(title.value, section.value, content.value)
      .then(this.context.addPost)
      .then((post) => {
        title.value = '';
        section.value = '';
        content.value = '';
        this.props.history.push(`/posts/${post.post_id}`)
      })
      .catch(this.context.setError)
  }

  render() {
    return(
      <div>
        <form 
        className = 'postForm'
        onSubmit={this.handleSubmit}
        >
          <h1>Add a post:</h1>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title"/>

          <label htmlFor="post_category">Category:</label>
          <select id="section" name="section">
            <option value="Jobs">Jobs</option>
            <option value="Apartments">Apartments</option>
            <option value="Cars">Cars</option>
            <option value="Events">Events</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="content">Description:</label>
          <textarea id="content" name="content" aria-label='Write your post description..'
          placeholder="Write your post description.." />
          <Button className="submit">
            Submit
          </Button> 
          <Button type="button" onClick={() => this.props.history.push('/')} className="cancel">
           Cancel
          </Button>         
        </form>
        
      </div>
    )
  }
}

export default PostForm;