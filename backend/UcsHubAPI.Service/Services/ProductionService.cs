using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository.Repositories;

namespace UcsHubAPI.Service.Services
{
    public class ProductionService : BaseService
    {

        public ProductionService(IOptions<AppSettings> appSettings) : base(appSettings)
        {
        }

        public IEnumerable<ProductionModel> GetAll()
        {
            ProductionRepository productionRepository = new ProductionRepository(_appSettings.ConnString);
            List<ProductionModel> productions = (List<ProductionModel>)productionRepository.GetAll();

            ProjectService projectService = new ProjectService((IOptions<AppSettings>)_appSettings);

            foreach (var prod in productions)
            {
                prod.Project = projectService.GetById(prod.ProjectId);
            }

            return productions;

        }

    }
}
