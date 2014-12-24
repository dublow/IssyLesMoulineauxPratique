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
            templatize('catviepratique', { model: all[0], root: 'vp' });
            templatize('catentreprise', { model: all[1], root: 'e' });
            
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
                return {
                    key: 'Non catégorisé',
                    values: values.source
                } ;
            }
        })
        .OrderBy(function (x) {
            return x.key;
        })
        .ToArray();
    };

    var templatize = function(containerId, model) {
        $.get('/Javascripts/Templates/categories.html', function (result) {
            $('#' + containerId).append(_.template($(result).html())(model));
            CHAKRA.filter(model.root);
            CHAKRA.fancyBox(model);
        });
    };

    return new app();
})(jQuery);

$(document).ready(function () {
    App.load();
});