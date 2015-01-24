using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ilm92.Attributes
{
    public class AjaxCrawlableAttribute : System.Web.Mvc.ActionFilterAttribute
    {
        private const string Fragment = "_escaped_fragment_";

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var request = filterContext.RequestContext.HttpContext.Request;

            if (string.IsNullOrWhiteSpace(request.QueryString[Fragment]))
                return;

            var parts = request.QueryString[Fragment].Split(new[] { '/' }, StringSplitOptions.RemoveEmptyEntries);
            var routeValues = new AjaxRoute();


                routeValues.Controller = "Page";

                routeValues.Action = "Index";

                routeValues.Id = parts[0];

            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(routeValues));
        }
    }

    public class AjaxRoute
    {
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Id { get; set; }
    }
}