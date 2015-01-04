var app = app || {};
app.baseModel;
$(function () {
    $.get('/Home/GetIlm92', function (model) {
        app.baseModel = JSON.parse(model);
        new app.CategoryView(app.baseModel);
        $(".menu").metisMenu();
    });
})