var app = app || {};


app.DescriptionView = Backbone.View.extend({
    el: '.descriptionView',
    events: {
        'click .showmap' : 'showMap'
    },
    
    render: function () {
        location.hash = this.model.titreHash;
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
    },

    showMap: function (evt) {
        
        var $target = $(evt.currentTarget),
            lat = $target.data('lat'),
            lng = $target.data('lng'),
            that = this;

        var nativeMap = app.nativeMap(lat, lng);
        if (nativeMap.active) {
            location.href = nativeMap.url;
            return;
        }

        var places = new Backbone.GoogleMaps.LocationCollection([
        {
            title: that.model.titre,
            lat: lat,
            lng: lng
        }
            ]);

        if (!app.Map) {
            var map = new google.maps.Map($('#map_canvas')[0], {
                center: new google.maps.LatLng(lat, lng),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // Render Markers
            app.Map = new Backbone.GoogleMaps.MarkerCollectionView({
                collection: places,
                map: map
            });
            app.Map.render();
        } else {
            app.Map.closeChildren();
            app.Map.addChild(places.models[0]);
            app.Map.map.setCenter({lat: lat, lng: lng});
        }
        
        $('.itemMap').removeClass('hide');

        app.changeForMap(window);
    }
});