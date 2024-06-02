using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;

namespace UcsHubAPI.Model.HelperObjects
{
    public class ProductionListObj
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DateCreated { get; set; }
        public ProductionTypeEnum Type { get; set; }
        public List<string> people { get; set; }

        public ProductionListObj()
        {
            people = new List<string>();
        }
    }
}
