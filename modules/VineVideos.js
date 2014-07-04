/**
 * @jsx React.DOM
 */

'use strict';

var React       = require('react');
var VineVideo   = require('./VineVideo');

var VineVideos = React.createClass({
  getInitialState: function() {
    return {
      activeImageURL: ''
    };
  },
  render: function () {
    var videos = this.props.videos;
    var data;
    if (videos && videos.length > 0) {
      data = videos.map(function (video) {
        return <VineVideo video={video}></VineVideo>;
      });
    }
    return (
      <div className="row content">
        {data}
      </div>
    )
  }
});

module.exports = VineVideos;
