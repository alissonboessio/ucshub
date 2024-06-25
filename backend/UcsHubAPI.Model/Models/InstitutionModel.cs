using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace UcsHubAPI.Model.Models
{
    public class InstitutionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Document { get; set; }
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public AddressModel? Address { get; set; }
        public int? AddressId { get; set; }

        public InstitutionModel()
        {
            
        }

        public InstitutionModel(int id)
        {
            Id = id;
        }
    }
}
