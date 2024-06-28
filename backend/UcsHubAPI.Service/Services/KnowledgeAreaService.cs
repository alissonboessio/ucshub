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

        public ListKnowledgeAreaResponse GetAll()
        {
            ListKnowledgeAreaResponse response = new ListKnowledgeAreaResponse();
            KnowledgeAreaRepository knowledgeAreaRepository = new KnowledgeAreaRepository(_appSettings.ConnString);

            response.KnowledgeAreas = (List<KnowledgeAreaModel>)knowledgeAreaRepository.GetAll();


            if (response.KnowledgeAreas.Count == 0)
            {
                throw new HttpRequestException("Nenhuma Área Encontrada!", null, System.Net.HttpStatusCode.NoContent);
            }
          
            response.Success = true;
            response.Message = "Encontrados";

            return response;

        }




    }
}
