using Microsoft.Extensions.Options;
using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Service.Services
{
    public class UserService : BaseService
    {
        public UserService(IOptions<AppSettings> appSettings) : base(appSettings)
        {
            
        }

        public IEnumerable<UserModel> GetAll() {
            return null;
        }


    }
}
