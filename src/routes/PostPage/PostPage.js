import React, { Component } from "react";
import PostContext from "../../contexts/PostContext";
import PostApiService from "../../services/post-api-service";
import TokenService from "../../services/token-service";
import { Section, Button } from "../../components/Utils/Utils";
import "./PostPage.css";
import AuthApiService from "../../services/auth-api-service";

export default class PostPage extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  static contextType = PostContext;

  state = {
    user_id: null,
  };

  componentDidMount() {
    AuthApiService.getUserInfo().then((res) => {
      this.setState({ user_id: res.user_id });
    });

    const { post_id } = this.props.match.params;
    this.context.clearError();
    PostApiService.getPost(post_id)
      .then(this.context.setPost)
      .catch(this.context.setError);
  }

  componentWillUnmount() {
    this.context.clearPost();
  }

  renderPost() {
    const { post } = this.context;
    return (
      <>
        <h2 className="PostPage__title">{post.title}</h2>
        <PostContent post={post} />
      </>
    );
  }

  handleDelete = () => {
    const { post_id } = this.props.match.params;
    PostApiService.deletePost(post_id)
      .then(this.context.clearPost)
      .catch(this.context.setError)
      .then(() => this.props.history.push("/myposts"));
  };

  render() {
    const { error, post } = this.context;
    const user_id = this.state.user_id;
    let content;
    if (error) {
      content =
        error.error === `Post doesn't exist` ? (
          <p className="error">Post not found</p>
        ) : (
          <p className="error">There was an error</p>
        );
    } else if (!post.post_id) {
      content = <div className="loading" />;
    } else {
      content = this.renderPost();
    }
    if (TokenService.hasAuthToken()) {
      return (
        <Section className="PostPage">
          {content}
          <div>
            {user_id === post.user_id ? (
              <div className="buttons">
                <Button
                  className="back-button"
                  onClick={() => this.props.history.goBack()}
                >
                  Back
                </Button>
                <Button
                  className="edit-button"
                  onClick={() =>
                    this.props.history.push(`/posts/edit/${post.post_id}`)
                  }
                >
                  Edit
                </Button>
                <Button className="delete-button" onClick={this.handleDelete}>
                  Delete
                </Button>
              </div>
            ) : (
              <Button
                className="back-button"
                onClick={() => this.props.history.goBack()}
              >
                Back
              </Button>
            )}
          </div>
        </Section>
      );
    } else {
      return (
        <Section className="PostPage">
          {content}
          <Button
            className="back"
            onClick={() =>
              this.props.history.push(
                `/view/${this.context.post.section.toLowerCase()}`
              )
            }
          >
            Back
          </Button>
        </Section>
      );
    }
  }
}

function PostContent({ post }) {
  return <p className="PostPage__content">{post.content}</p>;
}
