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
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetIlm92()
        {
            using (StreamReader streamReader = new StreamReader(HttpContext.Server.MapPath("~/Jsons/ilm92.json")))
            {
                return Json(streamReader.ReadToEnd(), JsonRequestBehavior.AllowGet);
                
            }
            return Json(null);
        }

        public JsonResult GetEventIlm92()
        {
            return Json(Helper.LoadJson("http://issy.com/ws/agenda/next/100"), JsonRequestBehavior.AllowGet);
        }

        
    }
}