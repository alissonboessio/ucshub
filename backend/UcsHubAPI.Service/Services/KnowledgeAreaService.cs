using Microsoft.Extensions.Options;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;
using UcsHubAPI.Response.Responses;

namespace UcsHubAPI.Service.Services
{
    public class KnowledgeAreaService : BaseService
    {
        public KnowledgeAreaService(IOptions<AppSettings> appSettings) : base(appSettings)
        {            
        }
         

    }
}
