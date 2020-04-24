import config from '../../config';
import React, { Component } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
     this.props.history.push("/view/" + event.target.value.toLowerCase());
  }  
  

  componentDidMount() {
    return fetch(`${config.API_ENDPOINT}/posts/sections`)
      .then(res => res.json())
      .then(res => {
        this.setState({sections: res})
      }) // TODO error handling check res ok
  }


  render() {
    return (
      <div id="homepage">
        <label htmlFor="posts" id="label">Choose posts to view: </label>
        <select id="posts" value={this.state.value} onChange={this.handleChange}>
        <option value="" disabled defaultValue>Select an option</option>
          {this.state.sections.map((section, i) => (
            <option value={section} key={i}>{section}</option>
          )
          )}        
        </select>
        <div id="posting">
          <Link to="/register">I'd like to post an event, job, apt, car, etc.</Link>
        </div>
      </div>
    )
  }
}