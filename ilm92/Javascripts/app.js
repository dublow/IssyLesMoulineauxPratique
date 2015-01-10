var app = app || {};
app.baseModel;
$(function () {
    $.get('/issyinteret/Home/GetIlm92', function (model) {
        var initialHeight = $(document).height();
        app.baseModel = JSON.parse(model);
        app.baseModel = _.sortBy(app.baseModel, function (item) {
            return [item.fields.categorie1, item.fields.categorie2, item.fields.categorie3, item.fields.categorie4, item.fields.titre].join("_");
        });
        
        new app.CategoryView(app.baseModel);
        $(".menu").metisMenu();

        $('.sidebar-collapse .menu ul').on('shown.bs.collapse', function () {
            var parent = $(this).closest("nav"),
                height = parent.height();
            if (height > $(document).height())
                $('#page-wrapper, #main').css({height: height});
        });

        $('.sidebar-collapse .menu ul').on('hidden.bs.collapse', function () {
            var parent = $(this).closest("nav");
            
            var itemHeight = 0;
            _.each($('.border-bottom'), function (item) {
                var height = $(item).height();
                if (height > 0)
                    itemHeight += 1;
            });

            if (itemHeight < 3)
                $('#page-wrapper, #main').css({ height: '100%' });
        });
    });
})