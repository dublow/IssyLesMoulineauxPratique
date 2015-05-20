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
using ilm92.Attributes;

namespace ilm92.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetIlm92()
        {
            return Json(Helper.LoadInteret(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEventIlm92()
        {
            return Json(Helper.LoadJson("http://issy.com/ws/agenda/next/100"), JsonRequestBehavior.AllowGet);
        }
    }
}