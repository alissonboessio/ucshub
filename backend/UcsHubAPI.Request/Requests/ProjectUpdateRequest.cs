

using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Request.Requests
{
    public class ProjectUpdateRequest : BaseRequest
    {
        public ProjectModel Project { get; set; }
    }
}
