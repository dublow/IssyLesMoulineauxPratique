using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web;
using System.IO;

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
    }
}