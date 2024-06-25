using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using UcsHubAPI.Model.Enumerations;

namespace UcsHubAPI.Model.Models
{
    public class ProjectModel
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ProjectStatusEnum Status { get; set; }
        public ProjectTypeEnum? Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public InstitutionModel Institution { get; set; }
        public List<PersonModel> Authors { get; set; }
        //public List<ResourceRequests> Resources { get; set; }
        public int? InstitutionId { get; set; }

    }
}
