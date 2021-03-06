﻿using System.Web;
using System.Web.Optimization;
using ilm92.Configuration;

namespace ilm92
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            var conf = IlmConfiguration.Current;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            var sBundle = new ScriptBundle("~/bundles/vendors");
            sBundle.Include(
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/underscore.js",
                "~/Scripts/backbone.js",
                "~/Scripts/metismenu.js",
                "~/Scripts/nprogress.js");

            if (conf.UseFb)
                sBundle.Include("~/Scripts/widgetFb.js");
            if(conf.UseTw)
                sBundle.Include("~/Scripts/widgetTw.js");
            if(conf.UseUv)
                sBundle.Include("~/Scripts/widgetUv.js");
            if (conf.UseGa)
                sBundle.Include("~/Scripts/widgetGa.js");

            bundles.Add(sBundle);

            bundles.Add(new ScriptBundle("~/bundles/page").Include(
                        "~/Javascripts/router.js",
                        "~/Javascripts/models/search.js",
                        "~/Javascripts/models/interet.js",
                        "~/Javascripts/models/detail.js",
                        "~/Javascripts/collections/search.js",
                        "~/Javascripts/collections/category.js",
                        "~/Javascripts/collections/Items.js",
                        "~/Javascripts/views/backbone.googlemaps.js",
                        "~/Javascripts/views/backbone.autocomplete.js",
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
                        "~/Content/bootstrap.min.css",
                        "~/Content/bootstrap-theme.min.css",
                        "~/Content/font-awesome.min.css",
                        "~/Content/metisMenu.css",
                        "~/Content/backbone.autocomplete.css",
                        "~/Content/site.css",
                        "~/Content/nprogress.css"
                        ));
        }
    }
}