using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace UcsHubAPI.Model.Models
{
    public class InstitutionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Document { get; set; }
        public DateTime CreatedAt { get; set; }
        public AddressModel Address { get; set; }
        public int? AddressId { get; set; }
    }
}
