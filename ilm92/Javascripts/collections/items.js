var app = app || {};

app.Items = Backbone.Collection.extend({
    model: app.Detail
});