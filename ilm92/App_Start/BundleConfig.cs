using System.Web;
using System.Web.Optimization;

namespace ilm92
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/vendors").Include(
                        "~/Scripts/underscore.js",
                        "~/Scripts/backbone.js",
                        "~/Scripts/metismenu.js"));

            bundles.Add(new ScriptBundle("~/bundles/page").Include(
                        "~/Javascripts/models/interet.js",
                        "~/Javascripts/models/detail.js",
                        "~/Javascripts/collections/category.js",
                        "~/Javascripts/collections/Items.js",
                        "~/Javascripts/views/interetItem.js",
                        "~/Javascripts/views/interet.js",
                        "~/Javascripts/views/category.js",
                        "~/Javascripts/views/items.js",
                        "~/Javascripts/views/description.js",
                        "~/Javascripts/common.js",
                        "~/Javascripts/app.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/metisMenu.css",
                        "~/Content/site.css"
                        ));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}