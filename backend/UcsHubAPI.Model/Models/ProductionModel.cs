using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;

namespace UcsHubAPI.Model.Models
{
    public class ProductionModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ProductionTypeEnum Type { get; set; }
        public ProjectModel Project { get; set; }
        public int ProjectId { get; set; }

    }
}
