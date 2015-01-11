using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace ilm92.Commons
{
    public class Helper
    {
        public static string IsProd { get { return ConfigurationManager.AppSettings["IsProd"]; } }
    }
}