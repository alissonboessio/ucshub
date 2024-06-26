using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;

namespace UcsHubAPI.Model.Models
{
    public class PersonModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Phone { get; set; }
        public string? LattesId { get; set; }
        public int? KnowledgeAreaId { get; set; }
        public InstitutionModel? Institution { get; set; }
        public KnowledgeAreaModel? KnowledgeArea { get; set; }
        public int? InstitutionId { get; set; }
        //public int AddressId { get; set; }
        public PersonTypeEnum Type { get; set; }
        public TitulationEnum Titulation { get; set; }

        public PersonModel()
        {
            
        }

        public PersonModel(string name)
        {
            this.Name = name;
        }
        public PersonModel(int id)
        {
            this.Id = id;
        }
    }
}
