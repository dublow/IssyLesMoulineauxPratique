var app = app || {};


app.DescriptionView = Backbone.View.extend({
    el: '.descriptionView',
    
    render: function () {
        if (app.DescriptionViewTemplate)
            this.$el.html(app.DescriptionViewTemplate(this.model));
        else {
            var that = this;
        
            app.loadTemplate('description.html', function (result) {
                app.DescriptionViewTemplate = _.template($(result).html());
                
                that.$el.html(app.DescriptionViewTemplate(that.model));
            });
        }

        return this;
    }
});