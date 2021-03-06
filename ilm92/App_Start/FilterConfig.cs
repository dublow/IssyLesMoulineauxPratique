﻿using ilm92.Attributes;
using System.Web;
using System.Web.Mvc;

namespace ilm92
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AjaxCrawlableAttribute());
        }
    }
}