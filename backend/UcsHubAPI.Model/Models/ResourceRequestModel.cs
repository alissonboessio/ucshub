using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace UcsHubAPI.Model.Models
{
    public class ResourceRequestModel
    {        	
        public int? Id { get; set; }
        public decimal Quantity { get; set; }
        public string? Document { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? FiledAt { get; set; }
        public DateTime? EntryAt { get; set; }

        [JsonIgnore]
        public PersonModel? Person { get; set; }
        public int? PersonId { get; set; }

        [JsonIgnore]
        public ProjectModel? Project { get; set; }
        public int? ProjectId { get; set; }

        [JsonIgnore]
        public InstitutionModel? Institution { get; set; }
        public int? InstitutionId { get; set; }

        public ResourceRequestModel()
        {
            
        }

        public ResourceRequestModel(int id)
        {
            Id = id;
        }
    }
}
