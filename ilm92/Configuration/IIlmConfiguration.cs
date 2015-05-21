using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ilm92.Configuration
{
    public interface IIlmConfiguration
    {
        bool IsProd { get; }
        bool UseFb { get; }
        bool UseTw { get; }
        bool UseUv { get; }
        bool UseGa { get; }
    }
}
