
using UcsHubAPI.Model.Models;

namespace UcsHubAPI.Response.Responses
{
    public class ListKnowledgeAreaResponse : BaseResponse
    {
        public List<KnowledgeAreaModel> KnowledgeAreas { get; set; }


    }
}
