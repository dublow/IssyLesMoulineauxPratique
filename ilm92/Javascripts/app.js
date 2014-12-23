var App = (function($) {
    var app = function() {
        
    };

    app.prototype.load = function() {
        $.getJSON('/Home/GetIlm92', function(response) {
            var all = group(JSON.parse(response), function (item) { return item.fields.categorie1; }, function(item) { return item.fields; });
            
            for (var i = 0; i < all.length; i++) {
                all[i].values = group(all[i].values, function(item) { return item.categorie2; }, function(item) { return item; });
                for (var j = 0; j < all[i].values.length; j++) {
                    all[i].values[j].values = group(all[i].values[j].values, function (item) { return item.categorie3; }, function (item) { return item; });
                }
            }
            console.log(all);
            templatize('catViePratique', { model: all[0] });
            templatize('catEntreprise', { model: all[1] });
        });
    };

    var group = function(list, fcnField, fcnreturn) {
        return Enumerable.From(list).GroupBy(function(item) {
            return fcnField(item);
        }, function(item) {
            return fcnreturn(item);
        }, function (key, values) {
            if (key) {
                return {
                    key: key,
                    values: values.source
                };
            } else {
                return values.source;
            }
        }).ToArray();
    };

    var templatize = function(containerClass, model) {
        $.get('/Javascripts/Templates/categories.html', function (result) {
            $('.' + containerClass).append(_.template($(result).html())(model));
        });
    };

    return new app();
})(jQuery);

$(document).ready(function () {
    App.load();
});