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
                return item.fields.titreHash === decodeURIComponent(action);
            });

            if (itemModel) {
                app.categoryView.renderRouter(itemModel);
                document.title = itemModel.fields.titre;
            }
                

            console.log(action);
            NProgress.done();
        });

        Backbone.history.start();
    }
};
    

