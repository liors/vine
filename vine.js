var vine = (function(){
    'use strict';
    var superagent = require('superagent');
    var _ = require('underscore-node');
    var jsdom = require('jsdom');
    var request = require('request');

    var urls = {
        popular: 'https://api.vineapp.com/timelines/popular',
        tag: 'https://api.vineapp.com/timelines/tags/'
    };

    var mapResult = function(data, size){
        return _.map(data,
            function (video) {
                return { videoUrl: video.videoUrl,
                    shareUrl: video.shareUrl + "/embed/postcard",
                    id: video.shareUrl.split('v/')[1],
                    avatarUrl: video.avatarUrl,
                    username: video.username,
                    description: video.description
                }
            }
        ).slice(0, size || 1);
    };

    return {
        getPopular: function (size, fn) {
            var cb = fn || function () {};
            superagent
                .get(urls.popular)
                .end(function (res) {
                    if (!res.body.success) {
                        return res.body.error
                    }
                    return cb(mapResult(res.body.data.records, size));
                });
        },
        search: function(q, size, fn){
            var cb = fn || function () {}
            superagent
                .get(urls.tag + q)
                .end(function(res){
                    if ( !res.body.success ) {
                        return res.body.error
                    }
                    return cb(mapResult(res.body.data.records, size));
                })
        },
        getVideo: function(videoId, fn){
            var cb = fn || function () {}
            var options = {
                url: 'https://vine.co/v/' + videoId,
                headers: {
                    'User-Agent': 'Googlebot'
                }
            };
            request(options, function (error, response, body) {
                if (error && response.statusCode !== 200) {
                    console.log('Error when contacting vine')
                }
                jsdom.env({
                    html: body,
                    scripts: ["http://code.jquery.com/jquery.js"],
                    done: function (errors, window) {
                        var $ = window.$;
                        return cb(mapResult(eval($('script').first().text()))[0]);
                    }
                });
            });
        }
    };
})();

module.exports = vine;
