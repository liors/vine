/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactMount  = require('react/lib/ReactMount');
var ReactRouter = require('react-router-component');

var Pages = ReactRouter.Pages;
var Page = ReactRouter.Page;
var NotFound = ReactRouter.NotFound;

var Search = require('./Search');
var SearchResults = require('./SearchResults');
var VineVideo = require('./VineVideo');
var FullPageVideo = require('./FullPageVideo');
var NotFoundHandler = require('./NotFoundHandler');

ReactMount.allowFullPageRender = true;

var App = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/assets/css/bootstrap.css" />
          <link rel="stylesheet" href="/assets/css/app.css" />
          <link rel="stylesheet" href="/assets/css/animations.css" />
          <script src="/assets/bundle.js" />
        </head>
        <Pages className="App" path={this.props.path}>
          <Page path="/" handler={Search} />
          <Page path="/videos/:keyword" handler={SearchResults} />
          <Page path="/video/:id" handler={FullPageVideo} />
          <NotFound handler={NotFoundHandler} />
        </Pages>
      </html>
    );
  }
});

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}

module.exports = App;
