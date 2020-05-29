import React from "react";
import PostContext from "../../contexts/PostContext";
import { Link } from "react-router-dom";
import "./HomePageAfterLogin.css";
import AuthApiService from "../../services/auth-api-service";

class HomePageAfterLogin extends React.Component {
  static contextType = PostContext;

  state = {
    name: "",
  };
  componentDidMount() {
    AuthApiService.getName().then((res) => {
      this.setState({ name: res.full_name });
    });
  }

  render() {
    return (
      <div className="HomePageAfterLogin">
        Welcome, {this.state.name}
        <ul id="afterLoginNav">
          <li>
            <Link to="/myposts">my posts</Link>
          </li>{" "}
          |
          <li>
            <Link to="/add-post">add a post</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default HomePageAfterLogin;
