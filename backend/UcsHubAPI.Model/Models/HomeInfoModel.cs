using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;

namespace UcsHubAPI.Model.Models
{
    public class HomeInfoModel
    {
        public decimal qtyTotalProductions { get; set; }
        public decimal qtyAcademicProductions { get; set; }
        public decimal qtyTechnicalProductions { get; set; }
        public decimal qtyTotalResearchers { get; set; }

    }
}
