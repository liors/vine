var vine = require('./vine.js');
var _ = require('underscore-node');

exports.widget = function(req, res){
    res.render('index', { });
};

exports.search = function(req, res){
    var q = req.params.q || 'wix';
    var size = req.params.size || '6';
    var query = "?";
    _.each(req.query, function(value, key){
        query += (key + "=" + encodeURIComponent(value) + "&");
    });
    query = query.substring(0, query.length - 1);
    res.redirect(query + '/#/search/' + q + '/' + size);
};

exports.settings = function(req, res){
    res.render('index', { });
};

exports.vinePopular = function(req, res){
    vine.getPopular(req.params.size || 6, function(data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    });
};

exports.vineSearch = function(req, res){
    vine.search(req.params.q || 'funny', req.params.size || 6, function(data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    });
};

exports.vineGetVideo = function(req, res){
    vine.getVideo(req.params.videoId || 'MJ9a50Z3pL0',  function(data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    });
};
