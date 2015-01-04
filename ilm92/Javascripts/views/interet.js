var app = app || {};


app.InteretView = Backbone.View.extend({
    tagName: 'ul',
    events: {        
        'click .expand': 'detail'
    },

    render: function () {
        if (app.InteretViewTemplate)
            this.$el.html(app.InteretViewTemplate(this.model.attributes));
        else {
            var that = this;
        
            app.loadTemplate('interet.html', function (result) {
                app.InteretViewTemplate = _.template($(result).html());
                
                that.$el.html(app.InteretViewTemplate(that.model.attributes));
            });
        }

        return this;
    },
    
    detail: function (evt) {
        var filter = evt.currentTarget.innerText;
        var deep = $(evt.currentTarget).data('deep');
        var result = _.filter(app.baseModel, function (item) {
            return item.fields['categorie' + deep] === filter;
        });
        
    },
    
    recursiveFilter: function (x) {
        if (_.isArray(x)) {
            return _.filter(x, function (item) {
                return item.key === this.currentTarget.innerText;
            }, this);
        }
        var fr = x.key === this.currentTarget.innerText;
        var sr = this.recursiveFilter(x.values);

        return fr || sr;
    }
});