

namespace UcsHubAPI.Request.Requests
{
    public class UsuarioSignUpRequest : BaseRequest
    {
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
