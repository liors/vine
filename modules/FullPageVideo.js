/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react');
var ReactRouter   = require('react-router-component');
var ReactAsync  = require('react-async');
var superagent  = require('superagent');
var VineMetaVideo = require('./VineMetaVideo');

var FullPageVideo = React.createClass({
  mixins: [ReactAsync.Mixin],

  getVideoData: function(cb) {
    var api = 'http://localhost:3010/vine/' + this.props.id;
    superagent.get(api, function(err, res) {
      cb(err, res ? {video: res.body} : null);
    });
  },

  getInitialStateAsync: function(cb) {
    this.getVideoData(cb);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.getVideoData(nextProps.id, function(err, video) {
        if (err) {
          throw err;
        }
        debugger;
        this.setState(video);
      }.bind(this));
    }
  },
  render: function () {
  return (
    <div className="full">
      <div id="video-container">
        <VineMetaVideo video={this.state.video}></VineMetaVideo>
        <div id="container">
          <video id="video" autoPlay muted="" preload="auto" loop poster="" src={this.state.video.videoUrl}></video>
        </div>
      </div>
    </div>
  );
}
});

module.exports = FullPageVideo;
