

using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Request.Requests
{
    public class ResourceRequestUpdateRequest : BaseRequest
    {
        public ResourceRequestModel ResourceRequest { get; set; }
    }
}
