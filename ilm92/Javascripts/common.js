Backbone.View.prototype.close = function () {
    this.undelegateEvents();
    this.$el.empty();
    this.unbind();
};

var app = app || {};

app.loadTemplate = function(templateName, callback) {
    call({
        url: '/issyinteret/Javascripts/templates/' + templateName,
        type: 'GET',
        dataType: 'html',
        async: false
    }, callback);
};

var call = function (options, done) {
    $.ajax(options).done(done);
}