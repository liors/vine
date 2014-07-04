/**
 * @jsx React.DOM
 */

'use strict';

var React       = require('react');
var ReactAsync  = require('react-async');
var superagent  = require('superagent');
var VineVideos  = require('./VineVideos');

var SearchResults = React.createClass({
  mixins: [ReactAsync.Mixin],

  getVideosData: function(keyword, cb) {
    var api;
    if (keyword === 'popular') {
      api = 'http://localhost:3010/vine/popular';
    } else {
      api = 'http://localhost:3010/vine/search/' + keyword;
    }
    superagent.get(api, function(err, res) {
      cb(err, res ? {videos: res.body} : null);
    });
  },

  getInitialStateAsync: function(cb) {
    this.getVideosData(this.props.keyword, cb);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.keyword !== nextProps.keyword) {
      this.getVideosData(nextProps.keyword, function(err, info) {
        if (err) {
          throw err;
        }
        this.setState(info);
      }.bind(this));
    }
  },

  render: function () {
    return (
      <div className="row content">
        <h1>{this.props.keyword}: showing 6 results</h1>
        <VineVideos videos={this.state.videos} />
      </div>
    )
  }
});

module.exports = SearchResults;
