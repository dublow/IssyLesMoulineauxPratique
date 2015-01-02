var app = app || {};


app.InteretView = Backbone.View.extend({
    tagName: 'div',
    className: 'interetContainer',
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
        var t =  _.map(this.model.attributes.values, this.recursiveFilter, { recursiveFilter: this.recursiveFilter, currentTarget: evt.currentTarget })[0];
        
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