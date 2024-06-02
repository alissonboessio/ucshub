using Microsoft.Extensions.Options;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;

namespace UcsHubAPI.Service.Services
{
    public class UserService : BaseService
    {
        public UserService(IOptions<AppSettings> appSettings) : base(appSettings)
        {            
        }

        public UserModel? AuthenticateUser(string name, string pwd)
        {
            UserRepository userRepository = new UserRepository(_appSettings.ConnString);
            PersonRepository personRepository = new PersonRepository(_appSettings.ConnString);

            UserModel? user = userRepository.GetByEmailPassword(name, pwd);
            

            if (user == null)
            {
                return null;
                
            }

            PersonModel? person = personRepository.GetById(user.Id);

            if(person == null)
            {
                return null;
            }

            user.Type = person.Type;
            user.Titulation = person.Titulation;
            user.Name = person.Name;
            user.BirthDate = person.BirthDate;
            user.Phone = person.Phone;
            user.LattesId = person.LattesId;

            return user;

        }

        public IEnumerable<UserModel> GetAll() {
            throw new NotImplementedException();
        }


    }
}
