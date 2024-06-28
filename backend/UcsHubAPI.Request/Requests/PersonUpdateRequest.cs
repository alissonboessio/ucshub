

using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Request.Requests
{
    public class PersonUpdateRequest : BaseRequest
    {
        public PersonModel Person { get; set; }
    }
}
