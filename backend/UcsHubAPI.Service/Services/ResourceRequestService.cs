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

        public ResourceRequestModel? UpdateResourceRequest(ResourceRequestModel res)
        {
            ResourceRequestRepository resourceRepository = new ResourceRequestRepository(_appSettings.ConnString);

            bool ok = false;

            try
            {
                if (res.Id != null)
                {
                    ok = resourceRepository.Update(res);

                }
                else
                {
                    ok = resourceRepository.Add(res);
                }
                               
            }
            catch (Exception e)
            {
                throw new HttpRequestException(message: "Recurso não atualizado!", e.InnerException, statusCode: System.Net.HttpStatusCode.BadRequest);
            }


            if (!ok)
            {
                throw new HttpRequestException(message: "Recusro não atualizado!", null, statusCode: System.Net.HttpStatusCode.BadRequest);
            }

            return resourceRepository.GetById((int)res.Id);

        }

    }
}
