using Microsoft.Extensions.Options;
using UcsHubAPI.Model.Enumerations;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;
using UcsHubAPI.Response.Responses;

namespace UcsHubAPI.Service.Services
{
    public class HomeInfoService : BaseService
    {
        public HomeInfoService(IOptions<AppSettings> appSettings) : base(appSettings)
        {            
        }
             
        public HomeInfoResponse GetIndicators() {
            HomeInfoResponse response = new HomeInfoResponse();

            HomeInfoModel model = new HomeInfoModel();

            PersonRepository personRepository = new PersonRepository(_appSettings.ConnString);
            ProductionRepository prodRepository = new ProductionRepository(_appSettings.ConnString);

            model.qtyTotalResearchers = personRepository.Count();
            model.qtyTotalProductions = prodRepository.Count();
            model.qtyTechnicalProductions = prodRepository.Count(ProductionTypeEnum.technic);
            model.qtyAcademicProductions = prodRepository.Count(ProductionTypeEnum.academic);

            response.Success = true;
            response.Message = "Encontrados";
            response.HomeInfo = model;

            return response;

        }


    }
}
