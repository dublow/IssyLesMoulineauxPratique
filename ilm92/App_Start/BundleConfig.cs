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
                        "~/Scripts/linq.js",
                        "~/Scripts/bootstrap.min.js",
                        "~/Scripts/supersized.3.2.7.min.js",
                        "~/Scripts/waypoints.js",
                        "~/Scripts/waypoints-sticky.js",
                        "~/Scripts/jquery.isotope.js",
                        "~/Scripts/jquery.fancybox.pack.js",
                        "~/Scripts/jquery.fancybox-media.js",
                        "~/Scripts/jquery.tweet.js",
                        "~/Scripts/jquery.tweet.js",
                        "~/Scripts/plugins.js",
                        "~/Scripts/main.js",
                        "~/Javascripts/app.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/placeholder.js",
                        "~/Scripts/modernizr.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/bootstrap.min.css",
                        "~/Content/bootstrap-theme.min.css",
                        "~/Content/site.css",
                        "~/Content/supersized.css",
                        "~/Content/supersized.shutter.css",
                        "~/Content/jquery.fancybox.css",
                        "~/Content/fonts.css",
                        "~/Content/shortcodes.css",
                        "~/Content/bootstrap-responsive.min.css",
                        "~/Content/responsive.css",
                        "~/Content/custom.css"
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