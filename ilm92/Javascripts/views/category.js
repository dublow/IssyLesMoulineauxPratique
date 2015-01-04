var app = app || {};

var grouper = {    
    categories: ['categorie1', 'categorie2', 'categorie3', 'categorie4'],
    Model: function(key, values, hasChildCategories) {
        this.key = key;
        this.values = values;
        this.hasChildCategories = hasChildCategories;
    }
};

app.CategoryView = Backbone.View.extend({
    el: '.sidebar-collapse',
    
    initialize: function (initialCategory) {
        var gp = this.groupCat(initialCategory).result;
        this.collection = new app.Category(gp);
        this.render();
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

                result.push(model);
            }
        });

        return { result: result, hasChildCategories: hasChildCategories };
    }    
});