using ilm92.Commons;
using ilm92.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using RazorEngine;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using System.Collections.Generic;
using System.IO;
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
            using (StreamReader streamReader = new StreamReader(filterContext.HttpContext.Server.MapPath("~/Jsons/ilm92.json")))
            {
                JArray interets = JArray.Parse(streamReader.ReadToEnd());

                var result = (from item in interets
                              where Helper.ReplaceParam((string)item["fields"]["titre"]) == parts[0]
                              select item).FirstOrDefault();
                if (result == null)
                    return;
                var template = Helper.LoadTemplate(filterContext.HttpContext.Server.MapPath("~/Template/Page.tpl"));
                var model = JsonConvert.DeserializeObject<InteretModel>(result.ToString());

                var templateResult = Engine.Razor.RunCompile(template, "templateKey", typeof(InteretModel), model);

                var contentResult = new ContentResult{
                    ContentType = "text/html",
                    ContentEncoding = System.Text.Encoding.UTF8,
                    Content = templateResult
                };
                filterContext.Result = contentResult;
            }
        }
    }

    public class AjaxRoute
    {
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Id { get; set; }
    }
}