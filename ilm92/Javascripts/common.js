Backbone.View.prototype.close = function () {
    this.undelegateEvents();
    this.$el.empty();
    this.unbind();
};

var app = app || {};

app.nativeMap = function (lat, lng) {
    var result = { active: false };
    if (isMobile.iOS()) {
        result.active = true;
        result.url = 'http://maps.apple.com/?q=' + lat + ',' + lng;
    } else if (isMobile.Android()) {
        result.active = true;
        result.url = 'geo:' + lat + ',' + lng;
    }

    return result;
}

app.urls = {
    template: isProd ? '/issyinteret/Javascripts/templates/' : '/Javascripts/templates/',
    interets: isProd ? '/issyinteret/Home/GetIlm92' : '/Home/GetIlm92',
    events: isProd ? '/issyinteret/Home/GetEventIlm92' : '/Home/GetEventIlm92'

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

var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};