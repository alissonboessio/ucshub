

using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Request.Requests
{
    public class ProductionUpdateRequest : BaseRequest
    {
        public ProductionModel Production { get; set; }
    }
}
