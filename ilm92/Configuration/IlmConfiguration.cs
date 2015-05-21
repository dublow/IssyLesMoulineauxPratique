using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace ilm92.Configuration
{
    public class IlmConfiguration : ConfigurationSection, IIlmConfiguration
    {
        private static readonly IlmConfiguration CurrentConfiguration;

        static IlmConfiguration()
        {
            CurrentConfiguration = (IlmConfiguration)ConfigurationManager.GetSection("ilm/settings");
        }

        public static IlmConfiguration Current
        {
            get { return CurrentConfiguration; }
        }

        [ConfigurationProperty("isProd", IsRequired = true)]
        public bool IsProd
        {
            get { return GetBool(this["isProd"]); }
        }

        [ConfigurationProperty("useFb", IsRequired = true)]
        public bool UseFb
        {
            get { return GetBool(this["useFb"]); }
        }

        [ConfigurationProperty("useTw", IsRequired = true)]
        public bool UseTw
        {
            get { return GetBool(this["useTw"]); }
        }

        [ConfigurationProperty("useUv", IsRequired = true)]
        public bool UseUv
        {
            get { return GetBool(this["useUv"]); }
        }

        [ConfigurationProperty("useGa", IsRequired = true)]
        public bool UseGa
        {
            get { return GetBool(this["useGa"]); }
        }

        private bool GetBool(object value)
        {
            return (bool) value;
        }
    }
}