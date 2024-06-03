using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcsHubAPI.Model.Models
{
    public class UserModel : PersonModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool VerifiedEmail { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? VerifiedAt { get; set; }

    }
}
