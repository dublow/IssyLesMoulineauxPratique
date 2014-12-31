var app = app || {};

app.CategoryView = Backbone.View.extend({
    el: '#category',
    
    initialize: function (initialBooks) {
        this.collection = new app.Category(initialBooks);
        this.render();
    },
    
    render: function() {
        this.collection.each(function (item) {
            this.renderInteret(item);
        }, this);
    },
    
    renderInteret: function(item) {
        var interetView = new app.InteretView({
            model: item
        });

        this.$el.append(interetView.render().el);
    }
});