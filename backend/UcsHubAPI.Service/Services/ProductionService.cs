using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.HelperObjects;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;
using UcsHubAPI.Response;
using UcsHubAPI.Response.Responses;

namespace UcsHubAPI.Service.Services
{
    public class ProductionService : BaseService
    {

        public ProductionService(IOptions<AppSettings> appSettings) : base(appSettings)
        {
        }

        public ListProductionResponse GetAll()
        {
            ListProductionResponse response = new ListProductionResponse();

            ProductionRepository productionRepository = new ProductionRepository(_appSettings.ConnString);
            List<ProductionModel> productions = (List<ProductionModel>)productionRepository.GetAll();

            ProjectService projectService = new ProjectService((IOptions<AppSettings>)_appSettings);

            foreach (var prod in productions)
            {
                prod.Project = projectService.GetById(prod.ProjectId);
            }

            response.Success = true;
            response.Message = "Encontrados";
            response.Productions = productions;

            return response;

        }
        
        public ProductionListObjResponse GetAllSimple(string person_id = null, string title = null)
        {
            ProductionListObjResponse response = new ProductionListObjResponse();
            ProductionRepository productionRepository = new ProductionRepository(_appSettings.ConnString);
            List<ProductionListObj> productions = null;
            if (!string.IsNullOrEmpty(person_id) || !string.IsNullOrEmpty(title))
            {

                if (Int32.TryParse(person_id, out int id))
                {
                    PersonModel Person = new PersonRepository(_appSettings.ConnString).GetById(id);
                    productions = (List<ProductionListObj>)productionRepository.GetAllSimpleFiltered(Person);

                }
                else
                {
                    throw new HttpRequestException("Filtro formatado errado!", null, System.Net.HttpStatusCode.BadRequest);
                }

                
            }
            else
            {
                productions = (List<ProductionListObj>)productionRepository.GetAllSimple();

            }


            response.Success = true;
            response.Message = "Encontrados";
            response.Productions = productions;

            return response;

        }

    }
}
