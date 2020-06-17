import React from "react";
import PostContext from "../../contexts/PostContext";
import PostApiService from "../../services/post-api-service";
import { Button } from "../../components/Utils/Utils";

class EditPost extends React.Component {
  static contextType = PostContext;
  componentDidMount() {
    const { post_id } = this.props.post
      ? this.props.post
      : this.props.match
      ? this.props.match.params
      : null;
    this.context.clearError();
    PostApiService.getPost(post_id)
      .then(this.context.setPost)
      .catch(this.context.setError);
  }

  componentWillUnmount() {
    this.context.clearError();
    this.context.clearPost();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, content, section } = event.target;
    const { post_id } = this.props.post
      ? this.props.post
      : this.props.match
      ? this.props.match.params
      : null;

    PostApiService.editPost(title.value, section.value, content.value, post_id)
      .then(this.context.addPost)
      .then((post) => {
        title.value = "";
        section.value = "";
        content.value = "";
        this.props.history.goBack();
      })
      .catch(this.context.setError);
  };

  handleDelete = () => {
    const confirm = prompt(`Type "delete this post" to confirm!`);
    if (confirm === "delete this post") {
      alert(`You'll be redirected to "MY POSTS" page`);
      const { post_id } = this.props.post
        ? this.props.post
        : this.props.match
        ? this.props.match.params
        : null;
      PostApiService.deletePost(post_id)
        .then(this.context.clearPost)
        .catch(this.context.setError)
        .then(() => this.props.history.push("/myposts"));
    } else {
      alert(`You have declined or entered wrong input`);
    }
  };

  goBack = (event) => {
    event.preventDefault();
    this.props.history.goBack();
    // window.location.reload(true);
  };
  render() {
    const { post, error } = this.context;
    let sections = ["Jobs", "Events", "Apartments", "Cars", "Other"];
    return (
      <div>
        <form className="postForm" onSubmit={this.handleSubmit}>
          <h1>Edit a post:</h1>
          {error ? <p className="error">{error.error}</p> : ""}
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title}
            required
          />

          <label htmlFor="post_category">Category:</label>
          <select id="section" name="section">
            {sections.map((section, i) => {
              return (
                <option
                  key={i}
                  value={section}
                  selected={post.section === section}
                >
                  {section}
                </option>
              );
            })}
          </select>

          <label htmlFor="content">Description:</label>
          <textarea
            id="content"
            name="content"
            aria-label="Write your post description.."
            placeholder="Write your post description.."
            defaultValue={post.content}
            required
          />
          <Button className="submit button">Submit</Button>
          <Button type="button" onClick={this.handleDelete} className="button">
            Delete
          </Button>
          <Button type="button" onClick={this.goBack} className="cancel button">
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

export default EditPost;
