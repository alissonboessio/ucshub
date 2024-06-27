using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;

namespace UcsHubAPI.Model.Models
{
    public class KnowledgeAreaModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CodCnpq { get; set; }
        public List<KnowledgeAreaModel>? KnowledgeParentarea { get; set; }
    }
}
