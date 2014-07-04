/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var ReactRouter = require('react-router-component');
var Link        = ReactRouter.Link;

var Search = React.createClass({
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleSearch: function () {
    location.pathname = '/videos/' + this.state.value;
  },
  render: function () {
    return (
      <div className="jumbotron">
        <h2>Vine App</h2>
        <p className="lead">Search for Vine videos, or see
          <Link href="/videos/popular">&nbsp;popular&nbsp;</Link>
        videos.</p>
        <div className="form-inline">
          <input type="text" className="form-control" onChange={this.handleChange} placeholder="Search vine.co" tabIndex="1" focused="focused" />
          <button type="submit" onClick={this.handleSearch} className="btn btn-primary">Search</button>
          </div>
      </div>
    );
  }
});

module.exports = Search;
