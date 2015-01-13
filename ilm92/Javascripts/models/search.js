var app = app || {};

app.Search = Backbone.Model.extend({
    label: function () {
        return this.get("fields").titre;
    }
});