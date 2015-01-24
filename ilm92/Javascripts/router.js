var app = app || {};

app.Router = {
    start: function () {
        var router = Backbone.Router.extend({
            routes: {
                '*actions': 'defaultRoute'
            }
        });

        var appRouter = new router();

        appRouter.on('route:defaultRoute', function (action) {
            var itemModel = _.find(app.baseModel, function (item) {
                return item.fields.titreHash === action;
            });

            if (itemModel)
                app.categoryView.renderRouter(itemModel);

            console.log(action);
        });

        Backbone.history.start();
    }
};
    

