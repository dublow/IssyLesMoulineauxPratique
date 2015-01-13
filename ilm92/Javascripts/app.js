var app = app || {};
app.baseModel;
$(function () {
    $.get(app.urls.json, function (model) {
        app.baseModel = JSON.parse(model);
        app.baseModel = _.sortBy(app.baseModel, function (item) {
            return [item.fields.categorie1, item.fields.categorie2, item.fields.categorie3, item.fields.categorie4, item.fields.titre].join("_");
        });
        
        new app.CategoryView(app.baseModel);
        $(".menu").metisMenu();

        $('.sidebar-collapse .menu ul')
            .on('shown.bs.collapse', function () { app.changeForCollapseOn(window) })
            .on('hidden.bs.collapse', function () { app.changeForCollapseOff(window) });
    });
})