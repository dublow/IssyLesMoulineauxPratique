var app = app || {};

app.ItemsView = Backbone.View.extend({
    el: '.itemsView',

    events: {
        'click .detailelement': 'detailElement',
        'click .pagination li': 'pagination'
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
                $('.itemDescription').removeClass('hide');
            });
        } else {
            this.$el.append(app.ItemsViewTemplate({ title: title, list: this.collection.toJSON() }));
        }

        
    },

    detailElement: function (evt) {
        if (app.currentDescriptionView) {
            app.currentDescriptionView.close();
            app.currentDescriptionView = null;
            $('.itemMap').addClass('hide');

            app.changeForMap(window);
        }
        var element = this.collection.models[$(evt.currentTarget).data('index')].attributes.fields;
        if (!element.description)
            element.description = '';
        if (!element.telephone)
            element.telephone = '';
        if (!element.email)
            element.email = '';
        if (!element.url)
            element.url = '';
        else if (element.url.indexOf('http://') === -1)
            element.url = 'http://' + element.url;
            
        app.currentDescriptionView = new app.DescriptionView({
            model: element
        });
        app.currentDescriptionView.render();

        ga('send', 'event', element.titre, 'click', 'Détail');
    },

    pagination: function (evt) {
        $('.pagination li').removeClass('active');
        $(evt.currentTarget).addClass('active');
        $('.detailView tr').addClass('hide');
        $($(evt.currentTarget).data('show')).removeClass('hide');
    },

    manualPagination: function (position, model) {
        $('.pagination li').removeClass('active');
        var li = _.find($('.pagination li'), function (item) {
            return $(item).data('show') === '.cat-' + position;
        });

        $(li).addClass('active');
        $('.detailView tr').addClass('hide');
        $($(li).data('show')).removeClass('hide');
    },

    manualDetailElement: function (model) {
        if (app.currentDescriptionView) {
            app.currentDescriptionView.close();
            app.currentDescriptionView = null;
            $('.itemMap').addClass('hide');

            app.changeForMap(window);
        }
        var element = model
        if (!element.description)
            element.description = '';
        if (!element.telephone)
            element.telephone = '';
        if (!element.email)
            element.email = '';
        if (!element.url)
            element.url = '';
        else if (element.url.indexOf('http://') === -1)
            element.url = 'http://' + element.url;

        app.currentDescriptionView = new app.DescriptionView({
            model: element
        });
        app.currentDescriptionView.render();
    }
});