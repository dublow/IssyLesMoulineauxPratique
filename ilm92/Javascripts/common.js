Backbone.View.prototype.close = function () {
    this.undelegateEvents();
    this.$el.empty();
    this.unbind();
};

var app = app || {};

app.urls = {
    template: isProd ? '/issyinteret/Javascripts/templates/' : '/Javascripts/templates/',
    json: isProd ? '/issyinteret/Home/GetIlm92' : '/Home/GetIlm92'
}

app.loadTemplate = function(templateName, callback) {
    call({
        url: app.urls.template + templateName,
        type: 'GET',
        dataType: 'html',
        async: false
    }, callback);
};

app.changeForMap = function (win) {
    app.changeForCollapseOff(win);
};

app.changeForCollapseOn = function (win) {
    var height = allHeight(win);
    if (height.isBigSideBar)
        $('#page-wrapper, #main').height(height.sideBar);
};

app.changeForCollapseOff = function (win) {
    var height = allHeight(win);
    if (height.sideBar < height.rows)
        $('#page-wrapper, #main').height(height.rows < height.window ? height.window : height.rows);
};

var allHeight = function (win) {
    var height = 0,
        sideBar = $('.sidebar-collapse').outerHeight(true),
        main = $('#main').outerHeight(true),
        window = $(win).height();

    _.each($('.border-bottom'), function (item) {
        height += $(item).outerHeight(true) + 20;
    });

    return {
        sideBar: sideBar,
        rows: height,
        main: main,
        window: window,
        isBigSideBar: sideBar > main
    };
};

var call = function (options, done) {
    $.ajax(options).done(done);
};