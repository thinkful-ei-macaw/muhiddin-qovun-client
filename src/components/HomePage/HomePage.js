import React, { Component } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: ["Events", "Jobs", "Apartments", "Cars", "Other"],
      value: "",
    };
  }

  handleChange = (event) => {
    this.props.history.push("/view/" + event.target.value.toLowerCase());
  };

  render() {
    return (
      <div id="homepage">
        <label htmlFor="posts" id="label">
          Choose posts to view:{" "}
        </label>
        <select
          id="posts"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <option value="" disabled defaultValue>
            Select an option
          </option>
          {this.state.sections.map((section, i) => (
            <option value={section} key={i}>
              {section}
            </option>
          ))}
        </select>
        <div id="posting">
          {TokenService.hasAuthToken() ? (
            <Link to="/add-post">I'd like to post a posting</Link>
          ) : (
            <Link to="/register">I'd like to post a posting</Link>
          )}
        </div>
      </div>
    );
  }
}
