using Microsoft.Extensions.Options;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;
using UcsHubAPI.Response.Responses;

namespace UcsHubAPI.Service.Services
{
    public class ResourceRequestService : BaseService
    {
        public ResourceRequestService(IOptions<AppSettings> appSettings) : base(appSettings)
        {            
        }

        public ResourceRequestModel? UpdateResourceRequest(ResourceRequestModel resourceReq)
        {
            ResourceRequestRepository resourceRepository = new ResourceRequestRepository(_appSettings.ConnString);

            bool ok = false;

            try
            {
                if (resourceReq.Id != null)
                {
                    ok = resourceRepository.Update(resourceReq);

                }
                else
                {
                    ok = resourceRepository.Add(resourceReq);
                }
                               
            }
            catch (Exception e)
            {
                throw new HttpRequestException(message: "Recurso não atualizado!", e.InnerException, statusCode: System.Net.HttpStatusCode.BadRequest);
            }


            if (!ok)
            {
                throw new HttpRequestException(message: "Recurso não atualizado!", null, statusCode: System.Net.HttpStatusCode.BadRequest);
            }

            return resourceRepository.GetById((int)resourceReq.Id);

        }

    }
}
