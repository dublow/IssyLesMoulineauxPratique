var app = app || {};

app.ItemsView = Backbone.View.extend({
    el: '.itemsView',

    events: {
        'click .detailelement' : 'detailElement'
    },
    initialize: function (items) {
        this.collection = new app.Items(items.result);
        this.render(items.title);
    },

    render: function (title) {
        if (!app.ItemsViewTemplate) {
            var that = this;
            app.loadTemplate('item.html', function (result) {
                app.ItemsViewTemplate = _.template($(result).html());
                that.$el.append(app.ItemsViewTemplate({ title: title, list: that.collection.toJSON() }));
            });
        } else {
            this.$el.append(app.ItemsViewTemplate({ title: title, list: this.collection.toJSON() }));
        }
    },

    detailElement: function (evt) {
        if (app.currentDescriptionView) {
            app.currentDescriptionView.close();
            app.currentDescriptionView = null;
        }
        var element = this.collection.models[$(evt.currentTarget).data('index')].attributes.fields;
        if (!element.description)
            element.description = 'Aucune description';
        if (!element.telephone)
            element.telephone = 'Aucun numéro de téléphone';
        if (!element.email)
            element.email = 'Aucun email';
        app.currentDescriptionView = new app.DescriptionView({
            model: element
        });
        app.currentDescriptionView.render();
    }
});