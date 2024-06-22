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

            if (user.Person != null) {
                PersonModel? person = personRepository.GetById(user.Person.Id);

                user.Person = person;
            }            

            return user;

        }
        
        public UserModel? CreateUser(string name, string email, string pwd)
        {
            UserRepository userRepository = new UserRepository(_appSettings.ConnString);
            PersonRepository personRepository = new PersonRepository(_appSettings.ConnString);


            if (userRepository.CheckEmailRegistered(email)){
                throw new HttpRequestException(message:"E-mail já cadastrado!", null, statusCode: System.Net.HttpStatusCode.BadRequest);
            }

            UserModel? user = new UserModel(email, pwd);
            PersonModel? person = new PersonModel(name);

            if (!personRepository.Add(person))
            {
                throw new HttpRequestException(message: "Usuário não registrado!", null, statusCode: System.Net.HttpStatusCode.BadRequest);

            }

            user.Person = person;

            if (!userRepository.Add(user))
            {
                throw new HttpRequestException(message: "Usuário não registrado!", null, statusCode: System.Net.HttpStatusCode.BadRequest);
            }

            //PersonModel? person = personRepository.GetById(user.Id);

            //if(person == null)
            //{
            //    return null;
            //}

            return userRepository.GetById(user.Id);

        }

        public IEnumerable<UserModel> GetAll() {
            throw new NotImplementedException();
        }


    }
}
