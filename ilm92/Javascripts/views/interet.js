var app = app || {};


app.InteretView = Backbone.View.extend({
    tagName: 'div',
    className: 'interetContainer',
    
    render: function () {
        if (app.InteretViewTemplate)
            this.$el.html(app.InteretViewTemplate(this.model.attributes));
        else {
            var that = this;
        
            $.get('/Javascripts/templates/interet.html', function (result) {
                app.InteretViewTemplate = _.template($(result).html());
                
                that.$el.html(app.InteretViewTemplate(that.model.attributes));
            });
        }

        return this;
    }
});