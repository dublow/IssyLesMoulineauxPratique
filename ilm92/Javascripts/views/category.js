var app = app || {};

var grouper = {    
    categories: ['categorie1', 'categorie2', 'categorie3', 'categorie4'],
    Model: function(key, values, hasChildCategories, totalChilds) {
        this.key = key;
        this.values = values;
        this.hasChildCategories = hasChildCategories;
        this.totalChilds = totalChilds;
    }
};

app.CategoryView = Backbone.View.extend({
    el: '.sidebar-collapse',
    
    initialize: function (initialCategory) {
        var gp = this.groupCat(initialCategory).result;
        this.collection = new app.Category(gp);
        this.render();
        this.renderSearch();
    },
    
    render: function() {
        this.collection.each(function (item, index) {
            this.renderInteret(item, index);
        }, this);
    },
    
    renderInteret: function(item, index) {
        var interetView = new app.InteretView({
            model: item,
            className: 'menu nav m' + index
        });

        this.$el.append(interetView.render().el);
    },

    renderSearch: function () {
        var that = this;
        new AutoCompleteView({
            input: $("#search"),
            model: new app.Searchs(app.baseModel),
            onSelect: function (model) {
                that.renderRouter(model.attributes);
                if(isProd)
                    ga('send', 'event', model.attributes.fields.titre, 'click', 'Recherche');
            }
        }).render();
    },

    renderRouter: function(model){
        if (app.currentInteretView) {
            app.currentInteretView.close();
            app.currentInteretView = null;
        }
        if (app.currentDescriptionView) {
            app.currentDescriptionView.close();
            app.currentDescriptionView = null;
            $('.itemMap').addClass('hide');

            app.changeForMap(window);
        }
        var keysModel = _.sortBy(_.keys(model.fields), function (item) {
            return item;
        });
        var lastCategorie = '';
        for (var i = 0, count = keysModel.length; i < count; i++) {
            if (keysModel[i] === 'categorie' + i)
                lastCategorie = keysModel[i];
        }

        var result = _.filter(app.baseModel, function (item) {
            return item.fields[lastCategorie] === model.fields[lastCategorie];
        });

        var cursor = 1;
        var canEach = true;
        var currentPagination;
        _.each(result, function (item, index) {
            if (index > 0 && index % 5 === 0)
                cursor++;
            if (canEach && item.fields.titre === model.fields.titre) {
                currentPagination = cursor;
                canEach = false;
            }
        });

        app.currentInteretView = new app.ItemsView({ title: model.fields[lastCategorie], result: result });

        if (currentPagination > 1)
            app.currentInteretView.manualPagination(currentPagination);

        app.currentInteretView.manualDetailElement(model.fields);

        if (isProd)
            ga('send', 'event', model.fields.titre, 'click', 'Router');
    },

    groupCat: function (list, idx) {
        
        var that = this,
            index = idx || 0;

        var gb = _.groupBy(list ? list : list.values, function (gItem) {
            return gItem.fields[grouper.categories[index]];
        });

        
        var result = [];
        var hasChildCategories = true;
        _.each(_.keys(gb), function (item) {
            if (item === 'undefined') {
                hasChildCategories = false;
                result = gb[item];
            } else {
                var model = new grouper.Model(item);
                
                if (index + 1 < grouper.categories.length) {
                    var gCat = that.groupCat(gb[item], index + 1);
                    model.values = gCat.result;
                    model.hasChildCategories = gCat.hasChildCategories;
                     
                } else {
                    model.values = gb[item];
                    model.hasChildCategories = false;
                    
                }
                model.totalChilds = model.values.length;
                result.push(model);
            }
        });

        return { result: result, hasChildCategories: hasChildCategories };
    }    
});