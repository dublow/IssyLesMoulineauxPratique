var app = app || {};

$(function () {
    $.get('/Home/GetIlm92', function(model) {
        new app.CategoryView(JSON.parse(model));
    });
})