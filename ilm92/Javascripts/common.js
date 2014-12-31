var app = app || {};

app.loadTemplate = function(templateName, callback) {
    call({
        url: '/Javascripts/templates' + templateName,
        type: 'GET',
        dataType: 'JSON',
        async: false
    }, callback);
};

var call = function (options, done) {
    $.ajax(options).done(done);
}