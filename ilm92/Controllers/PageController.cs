using ilm92.Commons;
using ilm92.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ilm92.Controllers
{
    public class PageController : Controller
    {
        //
        // GET: /Page/
        public ActionResult Index(string id)
        {
            if (Request.UserAgent.IndexOf("Googlebot") == -1)
                return Redirect("http://issyinteret.fr/#!" + id);

            JArray interets = JArray.Parse(Helper.LoadInteret());
            
            var result = (from item in interets
                            where Helper.ReplaceParam((string)item["fields"]["titre"]) == id
                            select item).FirstOrDefault();
                
            if (result == null)
                return RedirectToAction("Index", "Home");

            return View(JsonConvert.DeserializeObject<InteretModel>(result.ToString()));
        }

        public ActionResult SiteMap()
        {
            return RedirectToAction("Index", "Home");
            using (StreamReader streamReader = new StreamReader(HttpContext.Server.MapPath("~/Jsons/ilm92.json")))
            {
                JArray interets = JArray.Parse(streamReader.ReadToEnd());

                var result = (from item in interets
                              select Helper.ReplaceParam((string)item["fields"]["titre"]));

                Helper.CreateSitemap(Url, result).ExecuteResult(this.ControllerContext);
                
                return View();
            }

        }
	}
}