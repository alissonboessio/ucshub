using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcsHubAPI.Model.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool VerifiedEmail { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? VerifiedAt { get; set; }
        public PersonModel? Person { get; set; }

        public UserModel(string Email, string Password)
        {
            this.Email = Email;
            this.Password = Password;
        }
        public UserModel()
        {
            
        }

    }
}
