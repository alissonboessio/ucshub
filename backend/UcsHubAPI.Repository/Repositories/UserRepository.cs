using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Repository.Repositories
{
    public class UserRepository : IRepository<UserModel>
    {
        public IEnumerable<UserModel> GetAll()
        {
            throw new NotImplementedException();
        }
        
        public UserModel GetById(int id)
        {
            throw new NotImplementedException();
        }

        public UserModel GetByEmailPassword(string email, string password)
        {
            throw new NotImplementedException();
        }
        
        public bool Add(UserModel user)
        {
            throw new NotImplementedException();
        }
        public bool Update(UserModel user)
        {
            throw new NotImplementedException();
        }
        public bool Delete(UserModel user)
        {
            throw new NotImplementedException();
        }

    }
}
