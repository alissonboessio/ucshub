

using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Request.Requests
{
    public class InstitutionUpdateRequest : BaseRequest
    {
        public InstitutionModel Institution { get; set; }
    }
}
