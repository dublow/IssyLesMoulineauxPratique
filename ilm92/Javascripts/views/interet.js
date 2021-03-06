﻿var app = app || {};


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
        var target = $(evt.currentTarget);
        var filter = target.text().trim();
        var deep = target.data('deep');
        var result = _.filter(app.baseModel, function (item) {
            return item.fields['categorie' + deep] === filter;
        });
        
        app.currentInteretView = new app.ItemsView({ title: filter, result: result });
        
        if(isProd)
            ga('send', 'event', filter, 'click', 'Catégorie');
    }
});