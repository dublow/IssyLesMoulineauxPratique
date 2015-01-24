using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ilm92.Models
{
    public class InteretModel
    {
        public Fields Fields { get; set; }
    }

    public class Fields
    {
        public string Adresse { get; set; }
        public string Categorie1 { get; set; }
        public string Categorie2 { get; set; }
        public string Categorie3 { get; set; }
        public string Categorie4 { get; set; }
        public string CodePostal { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Telephone { get; set; }
        public string Titre { get; set; }
        public string Url { get; set; }
        public string Ville { get; set; }
    }

}