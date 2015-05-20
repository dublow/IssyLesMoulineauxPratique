using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web;
using System.IO;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using SimpleMvcSitemap;
using System.Web.Mvc;

namespace ilm92.Commons
{
    public class Helper
    {
        public static string IsProd { get { return ConfigurationManager.AppSettings["IsProd"]; } }

        public static string LoadJson(string url)
        { 
            if(string.IsNullOrEmpty(url))
                throw new ArgumentNullException("url");

            WebRequest webRequest = WebRequest.Create(url);

            using (WebResponse webResponse = webRequest.GetResponse())
            {
                using (StreamReader streamReader = new StreamReader(webResponse.GetResponseStream()))
                {
                    return streamReader.ReadToEnd();
                }
            }
        }

        public static string LoadTemplate(string templateName)
        { 
            using (StreamReader streamReader = new StreamReader(templateName))
            {
                return streamReader.ReadToEnd();
            }
        }

        public static string ReplaceParam(string value)
        {
            string result = Regex.Replace(ReplaceAccent(value), @"[^0-9a-zA-Z]+", "-");
            return string.Join("", result.Split('-')).ToLower();
        }

        public static string LoadInteret()
        {
            if (HttpContext.Current.Application["JsonInteret"] == null)
            {
                using (StreamReader streamReader = new StreamReader(HttpContext.Current.Server.MapPath("~/Jsons/ilm92.json")))
                {
                    HttpContext.Current.Application.Add("JsonInteret", streamReader.ReadToEnd());
                }
            }

            return (string) HttpContext.Current.Application["JsonInteret"];
        }

        public static ActionResult CreateSitemap(UrlHelper urlHelper, IEnumerable<string> urls)
        {
            var siteMapNodes = (from url in urls
                                select new SimpleMvcSitemap.SitemapNode("http://issyinteret.fr/#!" + url));

            return new SitemapProvider().CreateSitemap(new HttpContextWrapper(HttpContext.Current), siteMapNodes);
        }

        private static string ReplaceAccent(string value)
        {
            char[] replacement = { 'a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y' };
            char[] accents = { 'à', 'á', 'â', 'ã', 'ä', 'å', 'ç', 'é', 'è', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'ö', 'õ', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ' };


            for (int i = 0; i < accents.Length; i++)
            {
                value = value.Replace(accents[i], replacement[i]);
            }

            return value;
        }

        
    }
}