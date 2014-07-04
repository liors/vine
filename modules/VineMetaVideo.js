/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var VineMetaVideo = React.createClass({
  render: function () {
    return (
      <div className="meta">
        <div className="author">
          <img src={this.props.video.avatarUrl} className="avatar"/>
        </div>
        <div className="post-content">
          <p className="description">
            <span className="username">{this.props.video.username}</span>
            {this.props.video.description}
          </p>
        </div>
      </div>
    )
  }
});

module.exports = VineMetaVideo;
