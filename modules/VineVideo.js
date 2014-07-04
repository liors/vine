/**
 * @jsx React.DOM
 */
 
'use strict';

var React         = require('react');
var ReactRouter   = require('react-router-component');
var Link          = ReactRouter.Link;
var VineMetaVideo = require('./VineMetaVideo');

var VineVideo = React.createClass({
  componentWillMount: function() {
    this.setState({videoLink: "/video/" + this.props.video.id});
  },
  render: function () {
  return (
    <div className="video">
      <Link href={this.state.videoLink}>
      <div id="video-container">
        <div id="container">
          <video id="video" autoPlay muted="" preload="auto" loop poster="" src={this.props.video.videoUrl}></video>
        </div>
        <VineMetaVideo video={this.props.video}></VineMetaVideo>
      </div>
      </Link>
    </div>
  );
}
});

module.exports = VineVideo;
