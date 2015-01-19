var app = app || {};
app.baseModel;
$(function () {
    // Catégories
    $.get(app.urls.interets, function (model) {
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

    // Evénements
    $.get(app.urls.events, function (model) {
        app.eventModel = _.groupBy(JSON.parse(model), function (item) {
            return item.date_iso.substring(0, 10);
        });
        console.log(app.eventModel);
    });
})