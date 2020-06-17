import React, { Component } from "react";
import PostContext from "../../contexts/PostContext";
import PostApiService from "../../services/post-api-service";
import TokenService from "../../services/token-service";
import { Section, Button } from "../../components/Utils/Utils";
import "./PostPage.css";
import AuthApiService from "../../services/auth-api-service";
import { Redirect } from "react-router-dom";

export default class PostPage extends Component {
  static defaultProps = {
    match: { params: {} },
  };

  static contextType = PostContext;

  state = {
    user_name: "",
    error: "",
  };

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      AuthApiService.getUserInfo()
        .then((res) => {
          this.setState({ user_name: res.user_name });
        })
        .catch((error) => this.setState({ error }));
    }

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

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { error, post } = this.context;
    const username = this.state.user_name;
    const section = this.context.post.section.toLowerCase();
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
    if (post) {
      if (TokenService.hasAuthToken() && username === post.user_name) {
        return (
          <Section className="PostPage">
            <Redirect to={`/edit/${post.post_id}`} />
          </Section>
        );
      } else {
        return (
          <Section className="PostPage">
            {content}
            <Button
              className="back"
              onClick={() => this.props.history.push(`/view/${section}`)}
            >
              Back
            </Button>
          </Section>
        );
      }
    } else {
      console.log("loading");
    }
  }
}

function PostContent({ post }) {
  return <p className="PostPage__content">{post.content}</p>;
}
